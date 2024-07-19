const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let users = [];
let fixtures = [
    { id: 1, team1: "Team A", team2: "Team B", bets: [] },
    { id: 2, team1: "Team C", team2: "Team D", bets: [] },
];

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users.find(user => user.username === username)) {
        return res.status(400).json({ error: 'User already exists' });
    }
    users.push({ username, password, bets: [] });
    fs.writeFileSync('users.json', JSON.stringify(users));
    res.status(201).json({ message: 'User created' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
});

app.get('/fixtures', (req, res) => {
    res.json(fixtures);
});

app.post('/bet', (req, res) => {
    const { username, fixtureId, bet } = req.body;
    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }
    const fixture = fixtures.find(fixture => fixture.id === fixtureId);
    if (!fixture) {
        return res.status(400).json({ error: 'Fixture not found' });
    }
    fixture.bets.push({ username, bet });
    fs.writeFileSync('fixtures.json', JSON.stringify(fixtures));
    res.json({ message: 'Bet placed', fixture });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
