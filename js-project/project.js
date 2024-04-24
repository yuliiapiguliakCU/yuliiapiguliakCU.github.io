const volumeDisplay = document.getElementById('volume');
const currentPhraseDisplay = document.getElementById('current-phrase');
const completionMessage = document.getElementById('completion-message');
const restartBtn = document.getElementById('restart-btn');
const targetPhrase = "CHANGEVOLUME";
let currentPhrase = "";
let volume = 0;
let letterInterval;  

function getRandomColor() {
    const letters = 'BCDEF'.split('');  
    let color = '#';
    for (let i = 0; i < 3; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function addLetter(letter) {
    const letterElement = document.createElement('div');
    letterElement.textContent = letter;
    letterElement.className = 'letter';
    letterElement.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
    letterElement.style.color = getRandomColor();

    letterElement.onclick = function() {
        if (targetPhrase[currentPhrase.length] === letter) {
            currentPhrase += letter;
            volume = Math.floor((currentPhrase.length / targetPhrase.length) * 100);
            volumeDisplay.textContent = volume;
            currentPhraseDisplay.textContent = currentPhrase.split('').join(' ') + ' _'.repeat(targetPhrase.length - currentPhrase.length);
            if (currentPhrase === targetPhrase) {
                completionMessage.style.display = 'block';
                completionMessage.textContent = 'Congratulations! Volume is set to MAX!';
            }
        } else {
            this.style.color = '#f00';  // Flash red for incorrect choice
            setTimeout(() => {
                this.style.color = getRandomColor();  // Reset to a random color
            }, 200);
        }
    };

    document.body.appendChild(letterElement);
    setTimeout(() => document.body.removeChild(letterElement), 5000);  // Remove letter after it falls out of view
}

function startFallingLetters() {
    if (letterInterval) {
        clearInterval(letterInterval);  // Clear existing interval if it exists
    }
    letterInterval = setInterval(() => {
        addLetter("ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]);
    }, 250);
}

function restartGame() {
    currentPhrase = "";
    volume = 0;
    volumeDisplay.textContent = "0";
    currentPhraseDisplay.textContent = '_'.repeat(targetPhrase.length);
    completionMessage.style.display = 'none';
    document.querySelectorAll('.letter').forEach(letter => letter.remove());
    startFallingLetters();  // Restart falling letters without overlap
}

restartBtn.addEventListener('click', restartGame);

startFallingLetters();  // Initial call to start the game
