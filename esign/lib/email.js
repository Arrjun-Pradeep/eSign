const nodemailer = require('nodemailer');
const emailTemplate = require('../static/emailTemplate');
require('dotenv').config();

let contactEmail = 'contact@miners.com';

let links = {
	weblink: 'http://127.0.0.1:8081/miners.png',
	twitterUrl: 'https://twitter.com/miners',
	facebookUrl: 'https://facebook.com/miners',
	instaUrl: "https://instrgram.com/miners",
	linkedinUrl: "https://www.linkedin.com/company/miners",
	tumblrUrl: "https://tumblr.com/miners",
	telegramUrl: 'https://t.me/miners'
}

let copyrightYear = 2022

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
})

const sendMail = async(from, to, subject, link) => {

    console.log("afafadas",from, to)

    let result = await smtpTransport.sendMail({
        from: from,
        to: to,
        subject: subject,
        // html: `Your otp is`
        html: await emailTemplate.getVerificationLinkEmail(from, link, contactEmail, links, copyrightYear)
    })

    console.log(result)

}

module.exports = {
    sendMail,
    links
}