const quotes = [
    {
        quote: "Love is composed of a single soul inhabiting two bodies.",
        author: "Aristotle",
    },
    {
        quote: "The best thing to hold onto in life is each other.",
        author: "Audrey Hepburn",
    },
    {
        quote: "We are most alive when we’re in love.",
        author: "John Updike",
    },
    {
        quote: "Love all, trust a few, do wrong to none.",
        author: "William Shakespeare",
    },
    {
        quote: "Where there is love there is life.",
        author: "Mahatma Gandhi",
    },
    {
        quote: "You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.",
        author: "Dr. Seuss",
    },
    {
        quote: "Love is not about possession. Love is about appreciation.",
        author: "Osho",
    },
    {
        quote: "The greatest thing you’ll ever learn is just to love and be loved in return.",
        author: "Eden Ahbez",
    },
    {
        quote: "Love is friendship that has caught fire.",
        author: "Anne Lindbergh",
    },
    {
        quote: "In the end, we only regret the chances we didn’t take.",
        author: "Lewis Carroll",
    },
    {
        quote: "Love does not dominate; it cultivates.",
        author: "Johann Wolfgang von Goethe",
    },
    {
        quote: "The best love is the kind that awakens the soul.",
        author: "Nicholas Sparks",
    },
    {
        quote: "You are my sun, my moon, and all my stars.",
        author: "E.E. Cummings",
    },
    {
        quote: "Love is when the other person’s happiness is more important than your own.",
        author: "H. Jackson Brown Jr.",
    },
    {
        quote: "A successful relationship requires falling in love multiple times, but always with the same person.",
        author: "Mignon McLaughlin",
    },
];

let shift = 3; 
let currentQuote = {};
let hintIndex = 0; 

function encodeQuote(quote) {
    return quote.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt();
            let base = char.toLowerCase() === char ? 97 : 65;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

function displayNewQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const encoded = encodeQuote(currentQuote.quote);
    document.getElementById('clue').innerText = `Quote: ${currentQuote.author}`;
    document.getElementById('encoded-quote').innerText = encoded;
    document.getElementById('result').innerText = '';
    document.getElementById('user-input').value = '';
    hintIndex = 0; 
}

function checkAnswer() {
    const userInput = document.getElementById('user-input').value.trim().toLowerCase();
    const originalQuote = currentQuote.quote.toLowerCase();

    const sanitizedUserInput = userInput.replace(/[^a-z]/g, '');
    const sanitizedOriginalQuote = originalQuote.replace(/[^a-z]/g, '');

    if (sanitizedUserInput === sanitizedOriginalQuote) {
        document.getElementById('result').innerText = 'Correct! 🎉';
    } else {
        document.getElementById('result').innerText = 'Try again!';
    }
}

function provideHint() {
    const encodedQuote = document.getElementById('encoded-quote').innerText;
    const words = currentQuote.quote.split(' '); 
    const originalLetters = currentQuote.quote.split(''); 

    if (hintIndex < originalLetters.length) {
        const letterToReveal = originalLetters[hintIndex];
        const letterToReplace = encodedQuote[hintIndex];

        const updatedQuote = encodedQuote.split('').map((char, index) => {
            if (index === hintIndex) {
                return `<span style="color: green;">${letterToReveal}</span>`;
            }
            return char;
        }).join('');

        document.getElementById('encoded-quote').innerHTML = updatedQuote; 
        hintIndex++;
    } else {
        alert("No more hints available!");
    }
}

document.getElementById('submit-btn').addEventListener('click', checkAnswer);
document.getElementById('new-quote-btn').addEventListener('click', displayNewQuote);
document.getElementById('hint-btn').addEventListener('click', provideHint);

window.onload = displayNewQuote;
