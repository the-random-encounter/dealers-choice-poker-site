const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use an absolute path to the database file
const dbPath = path.resolve(__dirname, '../../users.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  // Insert a test user (username: 'test', password: 'password')
  const stmt = db.prepare("INSERT INTO users (username, hashpass, email, displayName) VALUES (?, ?, ?, ?)");
  stmt.run('test', 'password', 'test@test.com', "Test User");
  stmt.finalize();
});

module.exports = db;
