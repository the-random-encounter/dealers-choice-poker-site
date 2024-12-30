const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../../users.sqlite');

db.serialize(() => {
	db.run("CREATE TABLE users (username TEXT, hashpass TEXT)");

	// Insert a test user (username: 'test', password: 'password')
	const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
	stmt.run('test', 'password');
	stmt.finalize();
});

module.exports = db;