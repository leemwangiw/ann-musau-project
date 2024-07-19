document.getElementById('signup-button').addEventListener('click', signUp);
document.getElementById('login-button').addEventListener('click', logIn);

function signUp() {
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
        }
    });
}

function logIn() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('auth').classList.add('hidden');
            document.getElementById('fixtures').classList.remove('hidden');
            loadFixtures(data.user.username);
        }
    });
}

function loadFixtures(username) {
    fetch('/fixtures')
    .then(response => response.json())
    .then(fixtures => {
        const fixtureList = document.getElementById('fixture-list');
        fixtureList.innerHTML = '';
        fixtures.forEach(fixture => {
            const listItem = document.createElement('li');
            listItem.textContent = `${fixture.team1} vs ${fixture.team2}`;
            const betButton = document.createElement('button');
            betButton.textContent = 'Bet';
            betButton.addEventListener('click', () => placeBet(username, fixture.id));
            listItem.appendChild(betButton);
            fixtureList.appendChild(listItem);
        });
    });
}

function placeBet(username, fixtureId) {
    const bet = prompt('Enter your bet:');
    if (!bet) return;

    fetch('/bet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, fixtureId, bet })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
        }
    });
}
