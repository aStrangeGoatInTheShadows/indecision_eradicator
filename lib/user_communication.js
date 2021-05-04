require('dotenv').config();


//////////////////////////////////////////////////// Twilio BUILD OUT ////////////////////////////////////////////////////////////

const twilioSid = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilPhNum = process.env.TWILIO_PHONE_NUMBER;
const myPhNum = process.env.MY_PHONE;
const twil_client = require('twilio')(twilioSid, twilioAuthToken);


// twil_client.messages
//       .create({body: 'sprinkles are fun', from: twilPhNum, to: myPhNum})
//       .then(message => console.log(message.sid));

//////////////////////////////////////////////////// MAILGUN BUILD OUT ////////////////////////////////////////////////////////////
// const mailGunApiKey = process.env.MGUN_API_KEY;

// const mailgun = require("mailgun-js");
// const DOMAIN = process.env.MGUN_API_URL;
// const mg = mailgun({apiKey: mailGunApiKey, domain: DOMAIN});
// const data = {
// 	from: "Mailgun Sandbox <postmaster@sandbox191a488dcfe84de8aef3c2ac0d2f388c.mailgun.org>",
// 	to: "",
// 	subject: "Hello",
// 	text: "Testing some Mailgun awesomness!"
// };

///////////////////////////////////////////////////////////// MAILGUN CURRENTLY ABANDONED AND REMOVED FROM DEPENCIES CAUSE IT SUCKS /////////////////////////////////////////



///////////////////////////////////////////////////// NODE MAILER BUILD OUT ///////////////////////////////////////////////////////////

const nodemailer = require('nodemailer');
const myEmail = process.env.MY_EMAIL;
const appEmail = process.env.APP_EMAIL;
const appEmailPass = process.env.APP_EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: appEmail,
    pass: appEmailPass
  }
});

const mailOptions = {
  from: appEmail,
  to: myEmail,
  subject: 'testing email sends',
  text: 'we got this far'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});