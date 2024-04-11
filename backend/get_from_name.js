const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const util = require("util");

async function getFromName(name) {
  let db = new sqlite3.Database('./songs.db');

  let sql = "SELECT lyrics FROM 'songs' WHERE name = ?";

  return new Promise((resolve, reject) => {
    db.get(sql, [name.name], (err, row) => {
      db.close();
      
      if (err) {
        console.error(err.message);
        reject(err); 
      } else {
        console.log("ROW :", row);
        resolve(row); 
      }
    });
  });
}

module.exports = {getFromName};
