function showMenu() {
    // Display the menu buttons and hide the game area content
    document.querySelector('.container h1').innerText = 'CryptoCrafters';
    document.getElementById('game-area').innerHTML = ''; // Clear previous game content
    document.querySelectorAll('#cryptogram-game, #puzzle-game').forEach(button => {
        button.style.display = 'block'; // Show the game selection buttons
    });
}

function startCryptogramGame() {
    // Hide the menu and start the Cryptogram game
    document.querySelector('.container h1').innerText = 'Cryptogram Game';
    document.querySelectorAll('#cryptogram-game, #puzzle-game').forEach(button => {
        button.style.display = 'none'; // Hide the game selection buttons
    });
    startCryptogram(); // Call the startCryptogram function from cryptogram.js
}

function startPuzzleCipherGame() {
    // Hide the menu and start the Puzzle Cipher game
    document.querySelector('.container h1').innerText = 'Puzzle Cipher Game';
    document.querySelectorAll('#cryptogram-game, #puzzle-game').forEach(button => {
        button.style.display = 'none'; // Hide the game selection buttons
    });
    startDecoding(); // Call the startDecoding function from decoding.js
}

// Event listeners for game selection buttons
document.getElementById('cryptogram-game').addEventListener('click', startCryptogramGame);
document.getElementById('puzzle-game').addEventListener('click', startPuzzleCipherGame);

// Show the menu when the page loads
showMenu();
