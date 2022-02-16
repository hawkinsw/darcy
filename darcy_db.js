const Sqlite = require("better-sqlite3");

const SOURCE_FILE = "./darcy.db";

const db = new Sqlite(SOURCE_FILE);

module.exports = db;
