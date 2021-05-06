require("dotenv").config();

const { getPollData, getAllPhoneNumbersForPoll, getCreatorById }
  = require("../db/queries/db_get");

//////////////////////////////////////////////////// Twilio BUILD OUT ////////////////////////////////////////////////////////////

const twilioSid = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilPhNum = process.env.TWILIO_PHONE_NUMBER;
const myPhNum = process.env.MY_PHONE;
const twil_client = require("twilio")(twilioSid, twilioAuthToken);

//////////////////////////////////////////////////// Twilio BOILER PLATE ////////////////////////////////////////////////////////////
// twil_client.messages
//       .create({body: 'sprinkles are fun', from: twilPhNum, to: myPhNum})
//       .then(message => console.log(message.sid));

const smsOnPollCompletion = function(poll_id) {
  let smsString = `A poll you voted on has been completed.
	Head on over to `;
  const phone_numbers = [];
  let survey_link = "";

  getAllPhoneNumbersForPoll(poll_id)
    .then((res) => {
      phone_numbers.push(...res);
    })
    .catch((err) => {
      console.log(
        `We had an error trying to getAllPhoneNumbersForPoll : `,
        err
      );
      return;
    })
    .then(() => getPollData(poll_id))
    .catch((err) => {
      console.log(`We had an error trying to getPollData : `, err);
      return;
    })
    .then((res) => {
      survey_link = res.survey_link;
    })
    .then(() => {
      smsString += `${survey_link} to see the results.`;
    })
    .then(() => {
      twil_client.messages
        .create({ body: smsString, from: twilPhNum, to: myPhNum })
        .then((message) => console.log(message.sid));
    });
};

///////////////////////////////////////////////////// NODE MAILER BUILD OUT ///////////////////////////////////////////////////////////

const nodemailer = require("nodemailer");
// const myEmail = process.env.MY_EMAIL;
const myEmail = "quepastah@gmail.com ";
const appEmail = process.env.APP_EMAIL;
const appEmailPass = process.env.APP_EMAIL_PASS;

console.log(appEmail, appEmailPass)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: appEmail,
    pass: appEmailPass,
  },
});

const emailOnNewPoll = function(poll_id) {
  // const adminLink = '';

  getPollData(poll_id)
    .then((res) => res)
    .catch((err) =>
      console.log("emailOnNewPoll had the following error : ", err)
    )
    .then((poll) => createNewPollEmail(poll));
};

const emailOnVote = function(poll_id) {
  console.log("this is emailOnVote for poll_id ", poll_id);

  getPollData(poll_id)
    .catch((err) => console.log("emailOnVote had the following error : ", err))
    /////// WORKING HERE
    .then((poll_res) => {
      getCreatorById(poll_res.creator_id).then((user_res) => {
        console.log(user_res.rows[0].email);
        const mailOptions = {
          from: appEmail,
          to: user_res.rows[0].email,
          subject: "Another Vote!",
          html: `
            <h1>Someone New voted on your poll</h1>
            <a href="${poll_res.admin_link}">Checkout the results here!</a>
          `,
        };
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
    });
};

const createNewPollEmail = function(poll) {
  // console.log(poll);
  getCreatorById(poll.creator_id).then(result => {
    // console.log(result.rows[0].email)
    const mailOptions = {
      from: appEmail,
      to: result.rows[0].email,
      subject: "Here are the links for your new poll",
      html: `
	<h1>Your poll has been generated</h1>
	<h3>It can be seen via the links below</h3>

  <p><a href="${poll.admin_link}">Click here to vew the results!</a></p>
  <p><a href="${poll.survey_link}">Click here to place your own vote!</a></p>
  <div> THERE SHOULD BE LINKS ABOVE THIS</div>
	`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  });

};

// module.exports = {
//   emailOnVote,
// };


module.exports = {
  emailOnNewPoll,
  smsOnPollCompletion,
  emailOnVote
}
// emailOnNewPoll(4);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////// email boiler plate ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const mailOptions = {
//   from: appEmail,
//   to: myEmail,
//   subject: 'testing email sends',
//   text: 'we got this far'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });
