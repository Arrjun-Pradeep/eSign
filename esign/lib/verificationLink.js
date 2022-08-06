const crypto_lib = require('../lib/crypto');;``
const email_lib = require('../lib/email');

const generateVerificationLinkAndSendMail = async (sender, reciever, subject, id) => {

    try {

        let verificationLink = "http://localhost:5000/verifyLink/document?value="

        let parameters = "sender=" + sender + "&reciever=" + reciever + "&id=" + id 

        let encryptedData = crypto_lib.encrypt(parameters);

        let link = verificationLink + encryptedData;

        await email_lib.sendMail(sender, reciever, subject, link);

        return {
            status: true,
            message: link
        }

    } catch (error) {

        console.log(":: VERIFICATION_LINK_ERROR ::", error);

        return {
            status: false
        }

    }

}

module.exports = {
    generateVerificationLinkAndSendMail
}