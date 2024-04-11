const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const util = require("util");

async function getAllSongsFromDB() {
  let db = new sqlite3.Database('./songs.db');

  let sql = "SELECT * FROM 'songs'";

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, data) => {
      db.close();
      if (err) {
        console.error(err.message);
        reject(err); 
      } else {
        console.log("DATA :", data);
        resolve(data); 
      }
    });
  });
}

module.exports = {getAllSongsFromDB};