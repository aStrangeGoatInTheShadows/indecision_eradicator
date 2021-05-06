const cookieSession = require('cookie-session');
const express = require('express');
const helpers = require('../lib/helpers');
const { emailOnVote, emailOnNewPoll } = require('../lib/user_communication');
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
      creator_id: null,
      title: req.body.poll_title,
      description: req.body.poll_descr,
      admin_link: newLink + "/admin",
      survey_link: newLink,
      time_created: new Date().toISOString(),
      time_closed: null, //time of vote completion(using as bool) //stretch
      time_to_death: null, //countdown to poll //stretch
      max_votes: req.body.max_voters
    };
    if (!req.body.poll_title || !req.body.creator_email) {
      helpers.errorRedirect(res, req, 403, "Required Field is missing please make sure title and email are filled", "create_poll");
    }
    else {
      req.session.numPolls = req.body.poll_num_of_options;
      req.session.adminLink = newLink + "/admin";
      req.session.surveyLink = newLink;

      dbGet.getCreatorIdByEmail(req.body.creator_email).then(get_creator_id => {
        // console.log("get_creator_id: ",get_creator_id) //TESTING LINE ONLY
        if (get_creator_id) {
          newPoll.creator_id = get_creator_id;
          dbPut.put_new_poll(newPoll).then((result) => {
            req.session.pollID = result;
            helpers.happyRedirect(res, req, "create_poll_options");
          });
        }
        else {
          const newCreator = {
            email: req.body.creator_email,
            user_name: req.body.creator_email,
            password: "password",
            phone_number: null
          }
          dbPut.insertIntoCreators(newCreator).then(new_create_id => {
            // console.log("new_create_id: ",new_create_id) //TESTING LINE ONLY
            newPoll.creator_id = new_create_id;
            dbPut.put_new_poll(newPoll).then((result) => {
              req.session.pollID = result;
              helpers.happyRedirect(res, req, "create_poll_options");
            });
          })
        }
      })
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
    emailOnNewPoll(req.session.pollID);
    helpers.happyRedirect(res, req, "poll_created");
  });

  /* display page telling poll is created and the admin/survey links */
  app.get('/poll_created', (req, res) => {
    dbGet.getPollData(req.session.pollID).then((myVal) => {
      const title = myVal.title;
      const templateVars = {
        adminLink: req.session.adminLink,
        surveyLink: req.session.surveyLink,
        pollTitle: title
      };
      helpers.happyRender(res, req, 'poll_created', templateVars);
    });
  });
  /* Allows user see current ranking.*/
  app.get("/poll/:id/admin/", (req, res) => {
    // const adminLink = `http://www.pactweet.com/poll/${req.params.id}/admin`;
    const adminLink = `http://localhost:8080/poll/${req.params.id}/admin`;
    dbGet.getPollIdByAdminLink(adminLink).then((linkRes) => {
      const pollID = linkRes.id;
      dbGet.getPollRatings(pollID).then((result) => {
        const optionsArr = [];
        for (const option of result) {
          optionsArr.push(option.name);
        }
        const templateVars = {
          options: optionsArr,
          numPolls: optionsArr.length,
        };
        helpers.happyRender(res, req, "admin_view", templateVars);
      }).catch((error) => {
        res.render("error", {
          errCode: "Unable to get pollRatings: ",
          errMsg: error,
        });
      });
    }).catch((error) => {
      res.render("error", {
        errCode: "Unable to get ID link",
        errMsg: error,
      });
    });
  });

  app.get("/poll/:id/", (req, res) => {
    // const adminLink = `http://www.pactweet.com/poll/${req.params.id}/admin`;
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
    dbGet.getPollData(req.session.pollID).then(poll => {
      if (poll.total_votes >= poll.max_votes) {
        req.session.isClosed = true;
        helpers.happyRedirect(res, req, `/vote_submitted/`)
      } else {
        helpers.happyRedirect(res, req, `/poll/${req.params.id}/uservoting/`);
      }
    });
  });

  app.get("/poll/:id/uservoting/", (req, res) => {
    dbGet.getPollChoices(req.session.pollID)
      .then((result) => {
        const optionsArr = [];
        for (const option of result) {
          optionsArr.push(option.name);
        }
        dbGet.getPollData(req.session.pollID).then((result2) => {
          console.log("result2", result2);
          const templateVars = {
            userid: req.params.id,
            options: optionsArr,
            numPolls: optionsArr.length,
            pollDescription: result2.description,
            title: result2.title
          };
          helpers.happyRender(res, req, "user_voting", templateVars);
        });
      }).catch((error) => {
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

    emailOnVote(req.session.pollID);

    dbPut.incrementTotalVotes(req.session.pollID).then(result => {
      req.session.isClosed = false;
      req.session.total_votes = result.total_votes;
      req.session.max_votes = result.max_votes;
      dbPut.putPollRatings(req.session.pollID, poll_ratings);
      helpers.happyRedirect(res, req, `/vote_submitted/`)
    });;
  });

  app.get("/vote_submitted/", (req, res) => {
    let templateVars = {};
    if (req.session.isClosed || req.session.total_votes >= req.session.max_votes) {
      templateVars.title = "POLL CLOSED";

      if (req.session.total_votes === req.session.max_votes) {
        templateVars.header = `${req.session.total_votes} of ${req.session.max_votes} has been cast vote is now closing`;
        dbPut.incrementTotalVotes(req.session.pollID).then(result => console.log(result));
        req.session.total_votes++;
      } else {
        templateVars.header = "Sorry, this vote has been closed.";
      }

      templateVars.text = "Check in with the creator for the results of the poll"; //replace to the creator with creator name
    }
    else {
      templateVars.title = "POLL OPEN";
      templateVars.header = `${req.session.total_votes} of ${req.session.max_votes} users have submitted the poll...`;
      templateVars.text = "An email will be sent to the creator once the poll is completed"; //replace to the creator with creator name
    }
    helpers.happyRender(res, req, "vote_submitted", templateVars);
  });

  app.use(function(req, res, next) {
    helpers.happyRender(res, req, "error", {
      errCode: 404,
      errMsg: " The requested url does not exist",
    });
  });
  return app;
};
