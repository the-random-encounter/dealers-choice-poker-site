const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login route
app.post('/login', (req, res) => {
	const { username, hashpass } = req.body;

	db.get("SELECT * FROM users WHERE username = ? AND hashpass = ?", [username, hashpass], (err, row) => {
		if (err) {
			res.status(500).send('Internal Server Error');
		} else if (row) {
			res.send('Login successful');
		} else {
			res.send('Invalid username or password');
		}
	});
});

// Sign-up route
app.post('/signup', (req, res) => {
	const { username, hashpass } = req.body;

	if (!username || !hashpass) {
		return res.status(400).json({ error: 'Username and Password are required' });
	}

	if (hashpass.length < 6) {
		return res.status(400).json({ error: 'Password must be at least 6 characters long' });
	}

	db.run("INSERT INTO users (username, hashpass) VALUES (?, ?)", [username, hashpass], function(err) {
		if (err) {
			return res.status(500).json({ error: 'Internal Server Error' });
		} else {
			res.json({ message: 'Sign-up successful' });
		}
	});
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});