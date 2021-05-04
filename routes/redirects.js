const cookieSession = require('cookie-session');
const express = require('express');
const helpers = require('../lib/helpers');
const dbGet = require('../db/queries/db_get')
const dbPut = require('../db/queries/db_put')


const app = express();
app.use(cookieSession({
  name: 'session', keys: ["secret", "keys"], maxAge: (24 * 60 * 60 * 1000) //max age 24hrs
}));

module.exports = () => {
  app.get("/index", (req, res) => {
    res.redirect("/");
  });
  app.get("/home", (req, res) => {
    helpers.happyRedirect(res, req, "/");
  });

  /*gets from to create a poll  */
  app.get("/create_poll", (req, res) => {
    const templateVars = {
    };
    helpers.happyRender(res, req, "create_polls", templateVars);
  });

  /* gets all poll data from form, creates a new link, pushes poll to db, and redirects
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
      time_to_death: null //countdown to poll //stretch
    }

    dbPut.put_new_poll(newPoll).then(result => {
      req.session.pollID = result;
      req.session.numPolls = req.body.poll_num_of_options;
      req.session.adminLink = newLink + "/admin";
      req.session.surveyLink = newLink;

      helpers.happyRedirect(res, req, "create_poll_options");
    });
  });

  /* gets page to input poll options */
  app.get("/create_poll_options", (req, res) => {
    if (!req.session.numPolls) {
      req.session.numPolls = 2;
    }
    console.log("pollID: ", req.session.pollID)
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
    console.log(req.session.pollID)
    dbPut.putAllPollChoices(pollOptions, req.session.pollID);

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

  /* Allows user to edit options should discuss whether we want this later.*/
  app.get("/poll/:id/admin/", (req, res) => {
    const adminLink = `http://localhost:8080/poll/${req.params.id}/admin`;
    // const pollID = dbFuncs.getPollId(adminLink);
    const pollID = 1;
    const pollOptions = dbGet.getPollData(id);
    pollOptions = ["option1", "option2"]
    const templateVars = {
      options: pollOptions,
      numPolls: pollOptions.length
    };

    helpers.happyRender(res, req, "create_poll_options", templateVars);
  });

  /* Allows user to edit options should discuss whether we want this later.*/
  app.get("/poll/:id/", (req, res) => {
    const surveyLink = `http://localhost:8080/poll/${req.params.id}`;
    // const pollID = dbFuncs.getPollId(surveyLink);
    const pollID = 1;
    const pollOptions = dbGet.getPollData(id);
    pollOptions = ["option1", "option2"]
    const templateVars = {
      options: pollOptions,
      numPolls: pollOptions.length
    };

    helpers.happyRender(res, req, "create_poll_options", templateVars);
  });

  return app;
};

