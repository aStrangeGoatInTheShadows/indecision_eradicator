const { db_client } = require("../db.js");
const fs = require("fs");

let sql_file = "./db/schema/02_polls.sql";

// This will write the seeds file to our database
//fs.readFile("./db/seeds/02_polls_seed.sql",'utf-8', function (err, data) {
fs.readFile(
    sql_file,
    "utf-8",
    function (err, data) {
      if (data) {
        db_client
          .query(data)
          .then(()=>{
            console.log('Sucessfully created tables from', sql_file);
          })
          .catch((err)=>console.log('god fucking damnit ', err))
          .then(()=>{
            db_client.end();
          });
      }
    }
);

