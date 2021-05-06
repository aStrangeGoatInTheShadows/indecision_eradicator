const { db_client, makeGetQuery } = require("../db.js");
const input = process.argv[2];

// fetches id, title and creation time from a table
const getAllDebug = function(table) {
  // console.log("fetching all from table :", table);

  const queryString = makeGetQuery("id, title, time_created", table);

  db_client
    .query(queryString)
    // .then((res) => console.table(res.rows))
    .catch((err) => console.log("unable to get data", err))
    .finally(() => {
      db_client.end();
      console.log("closed connection to db");
    });
};

/**returns all existing Links
   @params: none
   @return: [{survey,admin},{survey,admin},{survey,admin},{survey,admin}]
*/
const getCurrLinks = function() {
  const db_query = makeGetQuery("survey_link, admin_link", "polls");
  // console.log(db_query);

  db_client.query(db_query).then((res) => {
    //  console.table(res.rows);
    return res.rows;
  });
};

/**takes a pollID and returns poll object
   @params: pollID: 1
   @return: {creatorID,
               title,
               description,
               adminLink,
               surveyLink,
               time_created,
               time_closed,
               time_to_death
            };
*/
const getPollData = function(poll_id) {
  const queryString = makeGetQuery(
    `creator_id, title, description, admin_link, survey_link, time_created, time_closed, time_to_death, total_votes, max_votes`,
    "polls",
    `id = $1`
  );

  return db_client.query(queryString, [poll_id]).then((res) => res.rows[0]);
};

/**takes a pollID and returns array of pollOptions
   @params: pollID: 1
   @return: ["option1","option2","option3"]
*/
const getPollChoices = function(poll_id) {
  const queryString = makeGetQuery(
    `poll_id, name, rating`,
    "poll_choices",
    `poll_id = $1`
  );

  return db_client.query(queryString, [poll_id]).then((res) => res.rows);
};

/**takes a pollID and returns array of pollOptions and ratings
   @params: pollID: 1
   @return: [{option1:10},{option2:20},{option3:145}]
*/
const getPollRatings = function(poll_id) {
  const queryString = makeGetQuery("*", "poll_choices", "poll_id = $1 ORDER BY RATING DESC");

  // console.log(queryString);

  return db_client.query(queryString, [poll_id])
    .then((res) => { return res.rows })
    .catch((err) => { console.log("getPollRatings ", err) });
};

/** given the admin Link return the pollID 
   @params adminLink: http://localhost:8080/poll/43S25H/admin
   @return: the admin's id AS AN OBJECT IN AN ARRAY
*/
const getPollIdByAdminLink = function(adminLink) {
  return db_client.query(`
    SELECT id
    FROM polls
    WHERE admin_link LIKE $1
  `, [adminLink])
    .then((res) => { return (res.rows[0]) })
}

const getAllPhoneNumbersForPoll = function(poll_id) {
  return db_client.query(`
    SELECT phone_number
    FROM poll_unique_visits
    WHERE poll_id = $1  
  `, [poll_id])
    .then(res => res.rows);
}

/** given the admin Link return the pollID
   @params email: blah@gmail.com
   @return: promise with creator_id
*/
const getCreatorIdByEmail = function(email) {
  return db_client.query(`
    SELECT id
    FROM creator
    WHERE email = $1
  `, [email]
  ).then(res => {
    // console.log(res);
    if (res.rows[0] != undefined) {
      return res.rows[0].id
    }
    else {
      return null
    }
  }).catch((err) => { console.log("getCreatorIdByEmail ", err) });
}
// getAllPhoneNumbersForPoll(4)

const getPollClosed = function(poll_id) {
  return db_client.query(`
    SELECT total_votes, max_votes, time_to_death
    FROM polls
    WHERE id = $1
  `, [poll_id]);
}

const getCreatorById = function (id) {
  return db_client.query(`
  SELECT *
  FROM creator
  WHERE id = $1
`, [id]);
}

module.exports = {
  getPollRatings,
  getAllDebug,
  getCurrLinks,
  getPollData,
  getPollChoices,
  getPollRatings,
  getPollIdByAdminLink,
  getAllPhoneNumbersForPoll,
  getCreatorIdByEmail,
  getCreatorById
};
