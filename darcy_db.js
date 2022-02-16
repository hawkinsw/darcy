const sqlite = require("sqlite3").verbose();

const SOURCE_FILE = "./darcy.db";

const db = new sqlite.Database(SOURCE_FILE, (err) => {
  if (err) {
    console.log("I could not open the darcy database.");
    throw err;
  } else {
    console.log("Got the database opened!\n");
  }
});

module.exports = db;
