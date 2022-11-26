const registerRouter = require('express').Router();
const config = require('../utils/config');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

registerRouter.post('/', async (req, res, next) => {
  const {email} = req.body;

  // construct a jwt
  const token = jwt.sign({email}, config.JWT_KEY, {expiresIn: '3h'});
  
  // send email
  sendMail({email, token}, (info) => {
    console.log(`The mail has beed sent 😃 and the id is ${info.messageId}`);
    res.send(info);
  })

  res.status(200);

});



// ref: https://github.com/funOfheuristic/emailSender/blob/master/app.js
async function sendMail(body, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.gmail.com",
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.EMAIL,
      pass: config.PASSWORD
    }
  }));

  let mailOptions = {
    from: 'myTracker', // sender address
    to: `${body.email}`, // list of receivers
    subject: "Wellcome to myTracker 👻", // Subject line
    html: `<h1>Hello new user</h1><br>
    <h4>Thanks for trying myTracker!</h4>
    <h4>Click the link below to signup.</h4>
    <a href="http://localhost:4200/signup/${body.token}">Click</a>
    `
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

module.exports = registerRouter;