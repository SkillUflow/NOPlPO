const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const util = require("util");

async function getFromName(name){
  let db = new sqlite3.Database('./songs.db');
  
  // Promisify the db.all() method
  const dbAll = util.promisify(db.all.bind(db));

  let sql = "SELECT * FROM 'songs' WHERE name = ' Je te donne'";
  
  try {
    // Use await with the promisified dbAll
    const rows = await dbAll(sql, [name]);
    console.log("NAMES_BOUCLE = ", rows);
    return rows;
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    // Make sure to close the database connection
    db.close();
  }
}

module.exports = {getFromName};