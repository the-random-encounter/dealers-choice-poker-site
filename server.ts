const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const saltRounds = 10;
const app = express();
const port = 3001;
const User = require('./public/model/User');
const mongoConnection = 'mongodb://localhost:27017/';

mongoose.connect(mongoConnection);


// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Basic route
// @ts-ignore
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login route
// @ts-ignore
app.post('/login', (req, res) => {
	const { username, hashpass } = req.body;

	// @ts-ignore
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
// @ts-ignore
app.post('/signup', async (req, res) => {

  console.log(JSON.stringify(req.body));

  const dob = req.body.dob;
  const dobYear = dob.split('-')[0];
  const dobMonth = dob.split('-')[1];
  const dobDay = dob.split('-')[2];
  const hashPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
    display_name: req.body.displayName || req.body.username,
    dob_year: dobYear,
    dob_month: dobMonth,
    dob_day: dobDay,
  });

  if (req.body.password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  await newUser.save()
    .then(() => {
      console.log(`User saved.`);
      res.status(200).json({ success: true, message: 'User registered successfully' });
      app.send('/signup-success');
    })
    .catch((err) => console.error(`Error: ${err}`));
});

app.get('/signup-success', (req, res) => {
  
})
  // @ts-ignore

// Start the server
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
