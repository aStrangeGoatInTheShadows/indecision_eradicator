const { db_client, makeGetQuery } = require("../db.js");
const input = process.argv[2];

// fetches id, title and creation time from a table
const getAllDebug = function (table) {
  console.log("fetching all from table :", table);

  const queryString = makeGetQuery("id, title, time_created", table);

  db_client
    .query(queryString)
    .then((res) => console.table(res.rows))
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
const getCurrLinks = function () {
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
const getPollData = function (poll_id) {
  const queryString = makeGetQuery(
    `creator_id, title, description, admin_link, survey_link, time_created, time_closed, time_to_death`,
    "polls",
    `id = $1`
  );

  return db_client.query(queryString, [poll_id]).then((res) => res.rows[0]);
};

/**takes a pollID and returns array of pollOptions
   @params: pollID: 1
   @return: ["option1","option2","option3"]
*/
const getPollChoices = function (poll_id) {
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
const getPollRatings = function (poll_id) {
  const queryString = makeGetQuery("*", "poll_choices", "poll_id = $1");

  console.log(queryString);

  return db_client.query(queryString, [poll_id])
    .then((res) => res.rows)
    .catch((err)=>{console.log("getPollRatings ", err)});
};

// const makeGetQuery = function (selection, table, where) {
//   let queryString = `SELECT ${selection}
//   FROM ${table}
//   `;

//   if (where) {
//     queryString += `WHERE ${where}
//     `;
//   }

//   return queryString;
// };

// getPollRatings(8);

module.exports = {
  getPollRatings
};
