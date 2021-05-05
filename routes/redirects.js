const cookieSession = require('cookie-session');
const express = require('express');
const helpers = require('../lib/helpers');
// const comms = require('../lib/user_communication');
const dbGet = require('../db/queries/db_get');
const dbPut = require('../db/queries/db_put');

const app = express();
app.use(
  cookieSession({
    name: "session",
    keys: ["secret", "keys"],
    maxAge: 24 * 60 * 60 * 1000, //max age 24hrs
  })
);

module.exports = () => {
  app.get("/", (req, res) => {
    helpers.happyRender(res, req, "index", {});
  });
  app.get("/index", (req, res) => {
    res.redirect("/");
  });
  app.get("/home", (req, res) => {
    res.redirect("/");
  });

  /*gets from to create a poll  */
  app.get("/create_poll", (req, res) => {
    let errorMessage = "";
    if (req.session.error) {
      errorMessage = req.session.error;
    }
    helpers.happyRender(res, req, "create_polls", { errorMsg: errorMessage });
  });

  /* gets all poll data from form, pushes poll to db, and redirects
   to create poll options
   */
  app.post("/create_poll", (req, res) => {
    const newLink = helpers.generateLink();
    const newPoll = {
      creator_id: 1,
      title: req.body.poll_title,
      description: req.body.poll_descr,
      admin_link: newLink + "/admin",
      survey_link: newLink,
      time_created: new Date().toISOString(),
      time_closed: null, //time of vote completion(using as bool) //stretch
      time_to_death: null, //countdown to poll //stretch
    };

    if (!req.body.poll_title || !req.body.creator_email) {
      helpers.errorRedirect(res, req, 403, "Required Field is missing please make sure title and email are filled", "create_poll");
    } else {
      dbPut.put_new_poll(newPoll).then((result) => {
        req.session.pollID = result;
        req.session.numPolls = req.body.poll_num_of_options;
        req.session.adminLink = newLink + "/admin";
        req.session.surveyLink = newLink;
        helpers.happyRedirect(res, req, "create_poll_options");
      });
    }
  });

  /* gets page to input poll options */
  app.get("/create_poll_options", (req, res) => {
    if (!req.session.numPolls) {
      req.session.numPolls = 2;
    }
    const templateVars = {
      numPolls: req.session.numPolls,
      options: [req.session.numPolls],
    };
    helpers.happyRender(res, req, "create_poll_options", templateVars);
  });

  /* gets new poll options and inserts to db, redirects to poll created */
  app.post("/create_poll_options", (req, res) => {
    const pollOptions = [];
    for (const item in req.body) {
      pollOptions.push(req.body[item]);
    }
    dbPut.putAllPollChoices(pollOptions, req.session.pollID);
    // comms.emailOnNewPoll(req.session.pollID);
    // comms.smsOnPollCompletion(req.session.pollID);
    helpers.happyRedirect(res, req, "poll_created");
  });

  /* display page telling poll is created and the admin/survey links */
  app.get("/poll_created", (req, res) => {
    const templateVars = {
      adminLink: req.session.adminLink,
      surveyLink: req.session.surveyLink,
    };

    helpers.happyRender(res, req, "poll_created", templateVars);
  });

  /* Allows user see current ranking.*/
  app.get("/poll/:id/admin/", (req, res) => {
    const adminLink = `http://localhost:8080/poll/${req.params.id}/admin`;
    dbGet
      .getPollIdByAdminLink(adminLink)
      .then((linkRes) => {
        const pollID = linkRes.id;
        dbGet
          .getPollRatings(pollID)
          .then((result) => {
            console.log(result);
            const optionsArr = [];
            for (const option of result) {
              optionsArr.push(option.name);
            }
            const templateVars = {
              options: optionsArr,
              numPolls: optionsArr.length,
            };
            helpers.happyRender(res, req, "admin_view", templateVars);
          })
          .catch((error) => {
            res.render("error", {
              errCode: "Unable to get pollRatings: ",
              errMsg: error,
            });
          });
      })
      .catch((error) => {
        res.render("error", {
          errCode: "Unable to get ID link",
          errMsg: error,
        });
      });
  });

  app.get("/poll/:id/", (req, res) => {
    const adminLink = `http://localhost:8080/poll/${req.params.id}/admin`;
    dbGet
      .getPollIdByAdminLink(adminLink)
      .then((linkRes) => {
        req.session.pollID = linkRes.id;
        const templateVars = { userid: req.params.id };
        helpers.happyRender(res, req, "user_landing", templateVars);
      })
      .catch((error) => {
        res.render("error", {
          errCode: "Unable to get pollID link",
          errMsg: error,
        });
      });
  });

  app.post("/poll/:id/", (req, res) => {
    helpers.happyRedirect(res, req, `/poll/${req.params.id}/uservoting/`);
  });

  app.get("/poll/:id/uservoting/", (req, res) => {
    dbGet
      .getPollChoices(req.session.pollID)
      .then((result) => {
        const optionsArr = [];
        for (const option of result) {
          optionsArr.push(option.name);
        }
        const templateVars = {
          userid: req.params.id,
          options: optionsArr,
          numPolls: optionsArr.length,
        };
        helpers.happyRender(res, req, "user_voting", templateVars);
      })
      .catch((error) => {
        res.render("error", {
          errCode: "Unable to get Poll Choices",
          errMsg: error,
        });
      });
  });

  app.post("/poll/:id/uservoting/", (req, res) => {
    const poll_ratings = [];

    /* NEED TO TEST THAT THIS RETRIEVES IN CORRECT ORDER */
    // console.log(req.body);
    let ranking = Object.keys(req.body).length;
    // console.log("number of options", ranking);
    for (const key in req.body) {
      const option = req.body[key];
      poll_ratings.push({ name: option, rank: ranking });
      console.log("poll_ratings: ", poll_ratings);
      ranking--;
    }
    ////////////////////////////////////// MATT CHECKING WHY THIS IS UNDEFINED     ////////////////////////////////////// MATT CHECKING WHY THIS IS UNDEFINED
    ////////////////////////////////////// MATT CHECKING WHY THIS IS UNDEFINED     ////////////////////////////////////// MATT CHECKING WHY THIS IS UNDEFINED

    //////////////////////////////////////////////// PUT POLL RATINGS DOES NOT RETURN A PROMISE, IT CAN'T BE CAUGHT
    /////////////////////////////////////////////// IT RETURNS true or false upon success, but it will not come back immediately because its async. This needs to be redesigned.

    /////////////////////////// POLL RATINGS ARE GETTING ADDED AFTER CHANGING TO RETURN TO PROMISE BUT PATH IS NOW BROKEN, NEED TO MAKE SURE GOING IN CORRECTLY

    dbPut.putPollRatings(req.session.pollID, poll_ratings);
    // .then(()=>{console.log('our promise was returned successfully')});
    helpers.happyRedirect(res, req, `/vote_submitted/`);
  });

  app.get("/vote_submitted/", (req, res) => {
    helpers.happyRender(res, req, "vote_submitted", {});
  });

  app.use(function(req, res, next) {
    helpers.happyRender(res, req, "error", {
      errCode: 404,
      errMsg: " The requested url does not exist",
    });
  });
  return app;
};
