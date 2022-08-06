var express = require('express');
var router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const crypto_lib = require('../lib/crypto');
const email_lib = require('../lib/email');
const config = require('../config');
const accountsModel = require('../models/account');
const pdf = require('../lib/pdf');
const documentsModel = require('../models/document');
const email = require('../lib/email');
const verificationLink = require('../lib/verificationLink');
const ipfs = require('../lib/ipfs');
const { readFile, writeFile, readdir } = require('fs/promises');
const { stat } = require('fs');
const contract = require('../lib/contract');

router.use(fileUpload());

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/pass', async (req, res, next) => {

	let verificationLink = "http://localhost:3000/verifyLink/document?value="

	let parameters = "otp=" + String("9999") + "&email=" + String("arjun") + "&coin=" + String("BITCOIN") + "&label=" + String("HELLOJS") + "&address=" + String("0x12424234")

	let encryptedData = crypto_lib.encrypt(parameters);

	// let link = await email_lib.sendMail(verificationLink + encryptedData);


	return res.status(200).send({
		status: true,
		message: "Verification link sent"
	})

})

// VERIFY THE LINK, SIGN THE DOC, STORE THE METADATA
router.get('/verifyLink/:key', async (req, res) => {

	let decryptedData = String(crypto_lib.decrypt(req.query.value))
	var datatoArray = decryptedData.split('&')

	var sender = datatoArray[0].split('=');
	var reciever = datatoArray[1].split('=');
	var id = datatoArray[2].split('=');

	sender = sender[1];
	reciever = reciever[1];
	id = id[1];

	console.log("asfasfasf", sender, reciever, id)

	let documentInfo = await documentsModel.findOne({ $and: [ 
		{
			'sender': sender
		},
		{
			'id': id
		}
	 ]}).lean().exec();

	 console.log("ASfasfasfasf", documentInfo)

	 let sig = await contract.initializeSigner1()
	 console.log("ASfasfasfasf", sig)


	 await pdf.modifyPDF(documentInfo.filePath , config.signedAssetsPath + document.filePath.name, documentInfo.recieverName );

	 console.log("documentInfo", documentInfo)

	let verified = true;

	if (verified) {
		res.write('<!DOCTYPE html><html><head><style>.button {background-color: #4CAF50; border: none; color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;-webkit-transition-duration: 0.4s;transition-duration: 0.4s;}.button1 {box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);}</style></head><body><button class="button button1" onclick="http://localhost:3000/">Success</button></body></html>');
		res.end();
	} else {
		res.write('<!DOCTYPE html><html><head><style>.button {background-color: #4CAF50; border: none; color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;-webkit-transition-duration: 0.4s;transition-duration: 0.4s;}.button1 {box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);}</style></head><body><button class="button button1">Session Expired</button></body></html>');
		res.end();
	}

})

// U P L O A D    D O C U M E N T    &    S E N D    M A I L    T O    R E C I E V E R
router.post('/uploadInfo', async (req, res) => {
	try {

		let { sender, reciever, name, message } = req.body;

		console.log("req.body", req.body)

		// I N I T I A L I Z I N G    T H E    F I L E N A M E 
		let data = req.files.file;

		console.log("aflkakjflwefwlef", data);

		let idInfo = await documentsModel.find().lean().exec();

		let id = idInfo.length + 1;

		// R E N A M I N G    T H E    F I L E N A M E 
		data.name = reciever + '_' + 'e-sign' + id + '.pdf';

		console.log("data", data.name)

		// M O V E    I M G    T O    A S S E T S    P A T H
		data.mv(path.join(config.assetsPath, data.name));

		let filePath = config.assetsPath +  data.name;
		console.log("file", filePath);

		let subject = "Miners - Document Sign"

		let document = await documentsModel.create({
			email: sender,
			from: sender,
			recieverName: name,
			to: sender,
			id: id,
			subject: subject,
			message: message,
			filePath: {
				'dir': config.assetsPath,
				'name': data.name
			}
		});

		
		// SEND EMAIL
		await verificationLink.generateVerificationLinkAndSendMail(sender, reciever, subject, id)

		return res.status(200).send({
			status: true,
			message: "Email Sent"
		})

	} catch (error) {

		console.log("ERRRRRR", error)
		return res.status(500).send({
			status: false,
			message: "Internal Server Error"
		})

	}
})

// SIGNUP
router.post("/signup", async (req, res, next) => {

	try {

		let { email, password, name, address } = req.body;

		console.log("req.body", req.body)

		let user = await accountsModel.findOne({ email: email }).lean().exec();

		console.log("asfdasfagsggad", user)

		if (user) {

			return res.status(412).send({
				status: false,
				message: "User Already Exists"
			})

		}
		else {

			let account = await accountsModel.create({
				email: email,
				password: password,
				name: name,
				address: address.account[0]
			});

			return res.status(200).send({
				status: true,
				message: "User Registered Successfully"
			})

		}

	} catch (error) {

		console.log("ERROR::LOGIN::", error);

		return res.status(500).send({
			message: "Internal Server Error",
			status: false
		});

	}

})

// LOGIN
router.post("/login", async (req, res, next) => {

	try {

		let { email, password, address } = req.body;

		console.log("REQ>BODY", req.body)

		let user = await accountsModel.findOne({ $and:[
			{
				email: email,
				address: address,
				password: password
			}
		] }).lean().exec();

		if (user) {

			return res.status(200).send({
				status: true,
				message: "success"
			})

		}
		else {

			return res.status(412).send({
				status: false,
				message: "User Doesn't Exists"
			})

		}

	} catch (error) {

		console.log("ERROR::LOGIN::", error);

		return res.status(500).send({
			status: false,
			message: "Internal Server Error"
		});

	}

})

// SIGN THE DOCUMENT AND STORE IN IPFS
router.post("/signDocument", async(req, res, next) => {

	try {
		
		console.log("ASfasfasf", req.user)

		let { email, id, signature, reciever } = req.body;

		console.log("wqrwerfwerwe", req.body);

		let documentInfo = await documentsModel.findOne({$and:[{
			email: email,
			id: id
		}]}).lean().exec();

		console.log("asfasfasfasf", documentInfo)

		let signedName = email + '_' + 'e-sign' + id + "_" + 'verify' + '.pdf';

		await pdf.modifyPDF(documentInfo.filePath , config.signedAssetsPath + signedName, signature, documentInfo.recieverName );

		let toIPFS = await ipfs.uploadFileToIPFS(await readFile(config.signedAssetsPath + signedName), documentInfo.from, documentInfo.to, id, signature);

		console.log("asfasfas", toIPFS);

		let info = await documentsModel.updateOne({$and:[{
			email: email,
			id: id
		}]},{
			$set: {
				"signedFilePath" :{
					dir: config.signedAssetsPath,
					name: signedName
				},				
				"metadata" : {
					sender: documentInfo.from,
					reciever: documentInfo.to,
					id: documentInfo.id,
					signature: signature,
					document: toIPFS.metaDataUrl
				}
			}
		},{
			upsert: true
		})

		let details = await documentsModel.findOne({$and:[{
			email: email,
			id: id
		}]}).lean().exec();

		let txnHash =  await contract.storeData(id, details.from, details.reciever, details.metadata.document ,details.metadata.signature)

		let infos = await documentsModel.updateOne({$and:[{
			email: 'ab',
			id: '22'
		}]},{
			$set: {
				transactionHash: txnHash
		}},{
			upsert: true
		})


		return res.status(200).send({
			status: true,
			message: "Document Signed Successfully"
		})


	} catch (error) {
		
		console.log(":: SIGN_ERROR ::", error);

		return res.status(500).send({
			status: true,
			message: "Internal Server Error"
		})

	}

})

module.exports = router;
