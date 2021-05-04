require('dotenv').config();


//////////////////////////////////////////////////// Twilio BUILD OUT ////////////////////////////////////////////////////////////

const twilioSid = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilPhNum = process.env.TWILIO_PHONE_NUMBER;
const myPhNum = process.env.MY_PHONE;
const twil_client = require('twilio')(twilioSid, twilioAuthToken);


// twil_client.messages
//       .create({body: 'FUCK EVERYONE!!!!!', from: twilPhNum, to: myPhNum})
//       .then(message => console.log(message.sid));

//////////////////////////////////////////////////// MAILGUN BUILD OUT ////////////////////////////////////////////////////////////
const mailGunApiKey = process.env.MGUN_API_KEY;

const mailgun = require("mailgun-js");
const DOMAIN = process.env.MGUN_API_URL;
const mg = mailgun({apiKey: mailGunApiKey, domain: DOMAIN});
const data = {
	from: "Mailgun Sandbox <postmaster@sandbox191a488dcfe84de8aef3c2ac0d2f388c.mailgun.org>",
	to: "",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};

console.log(data);

mg.messages().send(data, function (error, body) {
	console.log(body);
    console.log(error);
})
