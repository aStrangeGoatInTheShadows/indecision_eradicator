const { db_client } = require("../db.js");
const fs = require("fs");

let sql_file = "./db/seeds/02_polls_seed.sql";

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
            console.log("Succesfully created seed data.");
            db_client.end();
            console.log('connection to database terminated');
          })
          .catch((err)=>{
            console.log(`unable to create seed`, err);
            db_client.end();
            console.log('connection to database terminated');
          });
      }
    }
);

