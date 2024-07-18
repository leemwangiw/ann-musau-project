const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to read data from data.json
function readData() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data:', error);
        return { users: [] }; // Return default structure if error occurs
    }
}

// Function to write data to data.json
function writeData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing data:', error);
    }
}

// Endpoint to handle user sign-up
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    let data = readData();
    
    // Check if user already exists
    if (!data.users.find(user => user.username === username)) {
        // Add new user
        data.users.push({ username, password, bets: [] });
        writeData(data);
        res.json({ success: true, message: 'User created successfully.' });
    } else {
        res.status(400).json({ success: false, message: 'Username already exists.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
