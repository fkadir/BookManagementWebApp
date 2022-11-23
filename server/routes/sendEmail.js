var nodemailer = require("nodemailer");

//code adapted from: w3schools.com/nodejs/nodejs_email.asp

//doesnt work yet following error: Error: connect ETIMEDOUT 74.125.193.108:465
function sendResetLink(email, id) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: "bookmarked22@gmail.com",
      pass: "bookmarked22!",
    },
  });

  var mailOptions = {
    from: "bookmarked22@gmail.com",
    to: email,
    subject: "Reset password instructions",
    text: `To reset your password, please click on this link: http://localhost:3100/reset/${id}`,
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
