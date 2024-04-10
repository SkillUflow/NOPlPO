const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Ouvrir la connexion à la base de données
let db = new sqlite3.Database('./songs.db');


let sql = `SELECT * FROM 'songs' `;

let names = [];

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    names.push(row);
  });
});

