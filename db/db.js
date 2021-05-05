require("dotenv").config();
const pg = require("pg");
const Client = pg.Client;

//  DON'T TRY TO USE ANYTHING OTHER THAN JUST THE URL
// NO PASSWORDS OR PORTS OR USER
const db_client = new Client(process.env.DATABASE_URL);

db_client.connect().then(() => console.log("Connected to database"));

// Creates an formats a query string for PSQL based on what its passed
const makeGetQuery = function (selection, table, where) {
  let queryString = `SELECT ${selection}
  FROM ${table}
  `;

  if (where) {
    queryString += `WHERE ${where}
    `;
  }

  return queryString;
};

/** creates a put query
   @params: table, properties (array of what to change)
   @return: queryString
*/
const makePutQuery = function (table, properties, queryParams, return_id) {
  let queryString = `INSERT INTO ${table} (`;

  // adds $n as index for properties
  for (const property of properties) {
    if (properties.indexOf(property) > 0) {
      queryString += ",";
    }
    queryString += `${property}`;
  }
  queryString += `) VALUES`;

  // This tracks the iteration across loops
  let true_index = 1;

  // console.log('LENGTH OF queryParams',queryParams.length)
  // console.log(queryParams);

  // @https://stackoverflow.com/questions/31104879/how-to-check-if-array-is-multidimensional-jquery/42317865
  if(!(queryParams[0].constructor === Array)) {
    queryParams = [queryParams];
  } 


  // queryParams = queryParams.flat();
  // console.log(queryParams);

  // takes in nested properties and builds out the $n alias' section of query
  for (let n in queryParams) {
    queryString += `(`;

    for (const index in properties) {
      if (index > 0) {
        queryString += ",";
      }
      queryString += `$${true_index}`;
      true_index++;
    }
    queryString += ")";
    if (n < queryParams.length - 1) {
      queryString += ",";
    }
  }

  // if the requester wants the ids back for the new insertions
  if (return_id) {
    queryString += "RETURNING id";
  }
  return queryString;
};

const getQueryParams = function (table_obj) {
  let queryParams = [];

  for (const key in table_obj) {
    queryParams.push(key);
  }

  return queryParams;
};

module.exports = {
  db_client,
  makeGetQuery,
  makePutQuery,
  getQueryParams,
};
