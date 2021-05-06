const { db_client, makePutQuery, getQueryParams } = require("../db.js");
const { getPollRatings } = require(process.env.DB_GET_LOCATION);

const some_poll = {
  creator_id: 1,
  title: "awesome poll",
  description: "this is a description of our super awesome poll",
  admin_link: "google.ca/figureitoutyourself",
  survey_link: "lighthouselabs.ca",
  time_created: new Date(),
  time_closed: null,
  time_to_death: null,
};

/**
 * sendPollToDatabase
 * @param {} poll An object containing everything to setup a poll
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const sendPollToDatabase = function(poll) {
  console.log("creating a new poll");

  const queryParams = [];

  for (const key in poll) {
    queryParams.push(poll[key]);
  }

  const properties = [
    "creator_id",
    "title",
    "description",
    "admin_link",
    "survey_link",
    "time_created",
    "time_closed",
    "time_to_death",
    "max_votes"
  ];
  let queryString = makePutQuery("polls", properties, queryParams, true);

  console.log("sendPollToDatabase query", queryString, queryParams);

  return db_client.query(queryString, queryParams);
};


/**
 * put_new_poll
 * @param {} some_poll An object containing everything to setup a poll
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const put_new_poll = function(some_poll) {
  return sendPollToDatabase(some_poll)
    .then((res) => {
      console.log("added new poll to db with id:", res.rows[0].id);
      return res.rows[0].id;
    })
    .catch((err) =>
      console.log(
        "We tried to create a new poll.... we failed",
        err
      )
    );
};

/**takes in array of strings TO BE THE OPTION NAMES and the poll_id to add to
   @params:
   pollOptions:["option1","option2","option3"]
   pollID: 1
   @return: none
*/
const putAllPollChoices = function(choice_names, poll_id) {
  let queryParams = [];
  for (let name of choice_names) {
    const param = [poll_id, name];
    queryParams.push(param);
  }

  const queryString = makePutQuery(
    "poll_choices",
    ["poll_id", "name"],
    queryParams,
    true
  );
  queryParams = queryParams.flat();

  console.log(queryString);
  return db_client.query(queryString, queryParams).then((res) => {
    if (res.rows[1])
      console.log("Put all choices returned these id slots", res.rows);
  });
};

/**takes a pollID and returns array of pollOptions and ratings
   @params:pollRatings:[{option1:10},{option2:20},{option3:145}], pollID: 1
   @return: true/false for inserted or not
*/
const putPollRatings = function(poll_id, poll_ratings) {
  let current_ratings = [];

  // Gets the current values from the polls
  getPollRatings(poll_id)
    .then((table_data) => {
      current_ratings = table_data;
      console.log("current_ratings: ", current_ratings)
    })
    .then(() => {
      // console.log("poll_ratings: ", poll_ratings)
      for (let row of current_ratings) {
        for (let poll of poll_ratings) {
          if (poll.name === row.name) {
            row.rating += poll.rank;
          }
        }
        const queryString = `
          UPDATE poll_choices
          SET rating = ${row.rating}
          WHERE id = $1
        `;

        // console.log("poll_ratings[index]: ", poll_ratings[index])
        // console.log("index: ", index)
        ///////////////////////////// MAtt is WORKING HERE TO RETURN A PROMISE CORRECTLY OR FIX ASYNC ISSUES

        ///// RETURN THE FUNCTION CALL. DO EXECUTION WHEN IT COMES BACK.
        db_client.query(queryString, [row.id])
      }
    })
    .catch((err) => {
      console.log("not quite right on db_put side", err);
      return false;
    })
};

/**takes a pollID and returns array of pollOptions and ratings
   @param : current_ratings: [3,5,8...] whats existing in table
   @param : new_ratings : [3,5,8...] whats passed in for user votes
   @return: true/false for inserted or not
*/
const sumOurRatings = function(current_ratings, new_ratings) {
  const arr_of_ratings = [];
  for (let index in current_ratings) {
    arr_of_ratings.push(current_ratings[index].rating + new_ratings[index]);
  }

  return arr_of_ratings;
};


/**
 * sendPollToDatabase
 * @param {} poll An object containing everything to setup a poll
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const sendCreatorToDatabase = function(creator) {
  console.log("creating a new poll Creator: ", creator);

  const queryParams = [];

  for (const key in creator) {
    queryParams.push(creator[key]);
  }

  const properties = [
    "email",
    "user_name",
    "password",
    "phone_number"
  ];
  let queryString = makePutQuery("creator", properties, queryParams, true);

  console.log("sendPollToDatabase query", queryString, queryParams);

  return db_client.query(queryString, queryParams);
};

/** given the admin Link return the pollID 
   @params newCreator: newCreator = {
            email: req.body.creator_email,
            user_name: req.body.creator_email,
            password: "password",
            phone_number: null
          }
   @return: promise with the newly creator_id
*/
const insertIntoCreators = function(creator) {
  console.log(creator)
  return sendCreatorToDatabase(creator)
    .then((res) => {
      console.log("added new creator to db with id:", res.rows[0].id);
      return res.rows[0].id;
    })
    .catch((err) =>
      console.log(
        "HOLY FUCK WHAT THE HELL HAPPENED with creating a new CREATOR",
        err
      )
    );
}

/** Given the poll ID increase the pollTotal by 1, returning total_votes max_votes
 * @params pollID
 * @return: {total_votes:10, max_votes:11}
 */
const incrementTotalVotes = function(pollID) {
  const queryString = `
          UPDATE polls
          SET total_votes =total_votes + 1
          WHERE id = $1
          RETURNING total_votes, max_votes
        `;

  // console.log("poll_ratings[index]: ", poll_ratings[index])
  // console.log("index: ", index)
  ///////////////////////////// MAtt is WORKING HERE TO RETURN A PROMISE CORRECTLY OR FIX ASYNC ISSUES

  ///// RETURN THE FUNCTION CALL. DO EXECUTION WHEN IT COMES BACK.
  return db_client.query(queryString, [pollID]).then(res => { return res.rows[0]; });
}
// // do poll ratings for our dumb fat ex
// const arr_of_ratings = [10, 5, 2, 4, 3, 7, 8, 9, 1, 6];

// putPollRatings(8, arr_of_ratings);

// choice_names = [
//   "feet",
//   "leg",
//   "ass",
//   "grass",
//   "gas",
//   "french onion",
//   "worse survey ever",
// ];
// putAllPollChoices(choice_names, 2);

module.exports = {
  putPollRatings,
  putAllPollChoices,
  put_new_poll,
  insertIntoCreators,
  incrementTotalVotes
  // sendPollToDatabase
};
