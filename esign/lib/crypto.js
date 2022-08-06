const crypto = require('crypto')

var algorithm = "aes-192-cbc"; //algorithm to use
var password = "Hello darkness";
const key = crypto.scryptSync(password, 'salt', 24); //create key
const iv = Buffer.alloc(16, 0);


function encrypt(text) {

	const cipher = crypto.createCipheriv(algorithm, key, iv);
	var encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
	return encrypted;

}

function decrypt(text) {

	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	var decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
	return decrypted

}

module.exports = {
    encrypt,
    decrypt
}