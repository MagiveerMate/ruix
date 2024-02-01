// create-table.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'your-database-file.db');
const db = new sqlite3.Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    password TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error creating users table:', err.message);
  } else {
    console.log('Users table created successfully');
  }

  // Close the database connection after creating the table
  db.close();
});
