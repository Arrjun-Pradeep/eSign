var getVerificationLinkEmail = async (email,link, contactEmail, links, copyrightYear) => {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Miners</title>
    </head>
    <body style="margin: 0px; padding: 0px; font-family: 'Montserrat', sans-serif; font-size: 14px;">
    
        <table id="anxo_email_template" style="border-collapse: collapse; width: 100%; margin: 0px auto; background: #fff;">
            <tbody>
                <tr>
                    <td>
                        <table id="inner-section" style="width: 80%; margin: 0px auto; padding: 10px 0px 50px 0px; text-align: center;">
                            <tbody>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <img src="http://127.0.0.1:8081/miners.png" alt="Miners" style="width: auto; height: 200px;">
                                    </td>
                                </tr>
                                <tr>
                                   <td style="padding: 10px 0px; text-align: left;">Dear Miners Client,</td>
                                </tr>
                                <tr>
                                    <td style="padding:0px; text-align: left;"> Verification Link : <a href="${link}">${link}</a> </td>
                                </tr>
                                <tr>
                                    <td style="padding:20px 0px 0px 0px; text-align: left; ">Email: <a href="mailto:${email}">${email}</a></td>
                                </tr>
                                <tr>
                                    <td style="padding:0px; text-align: left;">If it's not you, please <a href="mailto:${contactEmail}" target="_blank">contact Miners Support</a> 
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:20px 0px 0px 0px; text-align: left;">
                                        <strong>Best Wishes,</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0px; text-align: left;">
                                        <strong>The Miners.io Team</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 5px 0px; text-align: left;">
                                        <img src="http://127.0.0.1:8081/miners.png" alt="Miners" style="width: auto; height: 20px;">
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                // <tr>
                //     <td style="padding: 30px 0px 0px; background: #0b1a49; color: #fff; text-align: center;">
                //         <table id="social-icons" style="width: 80%; margin: 0px auto;">
                //             <tbody>
                //                 <tr>
                //                     <a href="${links.weblink}" target="_blank"><img src="http://shamlatech.net/mockups/anxo/img/weblink.png" alt="Weblink" style="width: auto; height: 30px; margin: 0px 5px;"></a>
                //                     <a href="${links.twitterUrl}" target="_blank"><img src="http://shamlatech.net/mockups/anxo/img/twitter.png" alt="Follow us at Twitter" style="width: auto; height: 30px; margin: 0px 5px;"></a>
                //                     <a href="${links.facebookUrl}" target="_blank"><img src="http://shamlatech.net/mockups/anxo/img/facebook.png" alt="Follow us at Facebook" style="width: auto; height: 30px; margin: 0px 5px;"></a>
                //                     <a href="${links.instaUrl}" target="_blank"><img src="http://shamlatech.net/mockups/anxo/img/instagram.png" alt="Follow us at Instagram" style="width: auto; height: 30px; margin: 0px 5px;"></a>
                //                     <a href="${links.linkedinUrl}" target="_blank"><img src="http://shamlatech.net/mockups/anxo/img/linkedin.png" alt="Follow us at LinkedIn" style="width: auto; height: 30px; margin: 0px 5px;"></a>
                //                     <a href="${links.tumblrUrl}" target="_blank"><img src="http://shamlatech.net/mockups/anxo/img/reddit.png" alt="Follow us at Reddit" style="width: auto; height: 30px; margin: 0px 5px;"></a>
                //                     <a href="${links.telegramUrl}" target="_blank"><img src="http://shamlatech.net/mockups/anxo/img/blog.png" alt="Our Blogs" style="width: auto; height: 30px; margin: 0px 5px;"></a>
                //                 </tr>
                //             </tbody>
                //         </table>
                //     </td>
                // </tr>
                <tr>
                    <td style="padding:0px; background: #0b1a49; color: #fff; text-align: center;">
                        <p>Our Mailing Address is :</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 0px; background: #0b1a49; text-align: center;">
                        <a href="mailto:${contactEmail}" style="color: #fff; text-decoration: none;">${contactEmail}</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 0px 0px 30px 0px; background: #0b1a49; color: #fff; text-align: center;">
                        <p>Copyright &copy; ${copyrightYear} Miners.io All Rights Reserved.</p>
                    </td>
                </tr>
            </tbody>
        </table>
        
    </body>
    </html>`

}

module.exports = {
    getVerificationLinkEmail
}