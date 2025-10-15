// backend/db.js
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function init() {
  const db = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);

  return db;
}

module.exports = (async () => await init())();
