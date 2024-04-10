const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const util = require("util");

async function getFromName(name){

  let db = new sqlite3.Database('./songs.db');
  let sql = "SELECT lyrics FROM 'songs' WHERE name = '"+name+"'";
  let result= db.get(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row);
    return row;
  });
 
}

getFromName(' Je te donne');

module.exports = {getFromName};