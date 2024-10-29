const quotes = [
    "HELLO WORLD",
    "JAVASCRIPT IS FUN",
    "CRYPTOGRAPHY IS AMAZING",
    "CAESAR CIPHER IS A TYPE OF SUBSTITUTION CIPHER"
];

let currentQuote = '';
let cipherText = '';
let currentIndex = -1; // To keep track of the current quote index
const shift = 3; // Number of positions to shift

let quoteHistory = []; // Array to store history of quotes and user guesses

function caesarCipher(str, shift) {
    return str.toUpperCase().split('').map(char => {
        if (/[A-Z]/.test(char)) {
            let code = ((char.charCodeAt(0) - 65 + shift) % 26) + 65;
            return String.fromCharCode(code);
        }
        return char;
    }).join('');
}

function startGame(next = true) {
    if (next) {
        // Move forward to the next quote
        currentIndex++;
        if (currentIndex >= quotes.length) {
            currentIndex = 0; // Wrap around to the first quote if we reach the end
        }
    } else {
        // Move backward to the previous quote
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = quotes.length - 1; // Wrap around to the last quote if we reach the beginning
        }
    }

    currentQuote = quotes[currentIndex];
    cipherText = caesarCipher(currentQuote, shift);
    document.getElementById('cipher-text').innerText = cipherText;
    document.getElementById('feedback').innerText = '';
    document.getElementById('user-input').value = '';

    // Add to history if moving forward
    if (next) {
        quoteHistory.push({ quote: currentQuote, userGuess: '' });
    }
}

document.getElementById('submit-guess').addEventListener('click', () => {
    const userGuess = document.getElementById('user-input').value.toUpperCase();
    if (userGuess === currentQuote) {
        document.getElementById('feedback').innerText = 'Correct! Well done!';
    } else {
        document.getElementById('feedback').innerText = 'Try again!';
    }

    // Update the history with the user's guess
    if (quoteHistory.length > currentIndex) {
        quoteHistory[currentIndex].userGuess = userGuess;
    }
});

document.getElementById('next').addEventListener('click', () => startGame(true));
document.getElementById('previous').addEventListener('click', () => startGame(false));

// Start the game for the first time
startGame();
