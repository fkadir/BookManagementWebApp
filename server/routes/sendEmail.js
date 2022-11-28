var nodemailer = require("nodemailer");
const SMTPTransport = require("nodemailer/lib/smtp-transport");

//code adapted from: w3schools.com/nodejs/nodejs_email.asp and https://github.com/coding-with-chaim/forgot-password-code/blob/master/auth/sendEmail.js

//doesnt work yet following error: Error: connect ETIMEDOUT 74.125.193.108:465, problem for later
//change to outlook?
function sendResetLink(email, id) {
  var transporter = nodemailer.createTransport({
    //new SMTPTransport(
    host: "smtp-mail.outlook.com",
    port: 587,
    secureConnection: false,
    tls: {
      ciphers: "SSLv3",
      rejectUnauthorized: false,
    },
    auth: {
      user: "fennakadir@outlook.com",
      pass: "Fenshi26",
    },
  });

  var mailOptions = {
    from: "fennakadir@outlook.com",
    to: email,
    subject: "Reset password instructions",
    text: `To reset your password, please click on this link: http://localhost:3100/login/reset/${id}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendResetLink;
