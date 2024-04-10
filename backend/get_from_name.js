const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Ouvrir la connexion à la base de données
let db = new sqlite3.Database('./songs.db');

let name = `Rolling In The Deep`
let sql = "SELECT * FROM 'songs' WHERE name = ' Je te donne'";


let names = [];

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
    names.push(row);
  });
});

console.log(names)
