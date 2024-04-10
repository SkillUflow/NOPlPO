const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const util = require("util");

async function getFromName(name){

  let db = new sqlite3.Database('./songs.db');
  let sql = "SELECT lyrics FROM 'songs' WHERE name = '"+name+"'";
  let result = await db.get(sql, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log("1. ROW :");
    console.log(row);
    console.log("-----\n\n");
    return row;
  });

  console.log("2. RESULT :"); 
  console.log(result);
  console.log("-----\n\n");
  return result;
 
}

// Testing
// let t = getFromName(' Je te donne');
// console.log(t);

module.exports = {getFromName};
