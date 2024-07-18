// Simulated user data (for demonstration purposes only)
let userData = {
    users: []
};

// Function to handle user login
function login() {
    let username = document.getElementById('loginUsername').value;
    let password = document.getElementById('loginPassword').value;

    // Simulate user authentication
    let user = userData.users.find(user => user.username === username && user.password === password);
    if (user) {
        // Display fixtures and betting form
        document.getElementById('fixturesList').style.display = 'block';
        document.getElementById('bettingForm').style.display = 'block';

        // Populate fixtures list (replace with actual fixture data)
        let fixtures = ["Fixture A", "Fixture B", "Fixture C"];
        let fixturesDropdown = document.getElementById('fixtureSelect');
        fixturesDropdown.innerHTML = ''; // Clear existing options
        fixtures.forEach(fixture => {
            let option = document.createElement('option');
            option.text = fixture;
            fixturesDropdown.add(option);
        });
    } else {
        alert('Invalid username or password.');
    }
}

// Function to handle user sign-up
function signUp() {
    let username = document.getElementById('signupUsername').value;
    let password = document.getElementById('signupPassword').value;

    // Check if user already exists
    let userExists = userData.users.find(user => user.username === username);
    if (!userExists) {
        // Add new user
        userData.users.push({ username: username, password: password, bets: [] });
        alert('User created successfully. You can now log in.');
    } else {
        alert('Username already exists.');
    }
}

// Function to place a bet
function placeBet() {
    let selectedFixture = document.getElementById('fixtureSelect').value;
    let username = document.getElementById('loginUsername').value;

    // Find user in userData
    let currentUser = userData.users.find(user => user.username === username);
    if (currentUser) {
        // Simulate placing a bet (store in user data)
        currentUser.bets.push(selectedFixture);

        // Update JSON (replace with backend integration or storage logic)
        console.log(JSON.stringify(userData));
        alert(`Bet placed on ${selectedFixture} successfully.`);
    } else {
        alert('User not found.');
    }
}
