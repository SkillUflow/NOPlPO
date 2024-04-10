const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const util = require("util");

async function getFromName(name){

  let db = new sqlite3.Database('./songs.db');
  let sql = "SELECT lyrics FROM 'songs' WHERE name = '"+name+"'";
  //on définit une promise de result
  let result = new Promise((resolve, reject) => {
    db.get(sql, (err, rows) => {
      if (err) {
        throw err;
      }
      resolve(rows);
    });
  });
 //on attend le résultat de la promise
  let rows = await result;
  //on retourne le résultat
  return rows;
}

getFromName(' Je te donne').then(rows => {
  console.log(rows);
}).catch(error => {
  console.error(error);
});


module.exports = {getFromName};