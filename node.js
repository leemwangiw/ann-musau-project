const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Simulated user data
let userData = {
    users: []
};

// Sign-up endpoint
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // Check if user already exists
    let userExists = userData.users.find(user => user.username === username);
    if (!userExists) {
        // Add new user
        userData.users.push({ username, password, bets: [] });
        res.json({ success: true, message: 'User created successfully.' });
    } else {
        res.status(400).json({ success: false, message: 'Username already exists.' });
    }
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check user credentials
    let user = userData.users.find(user => user.username === username && user.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
});

// Place bet endpoint
app.post('/placeBet', (req, res) => {
    const { username, fixture } = req.body;
    // Find user and place bet
    let currentUser = userData.users.find(user => user.username === username);
    if (currentUser) {
        currentUser.bets.push(fixture);
        res.json({ success: true, message: `Bet placed on ${fixture} successfully.` });
    } else {
        res.status(401).json({ success: false, message: 'User not found.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
