document.addEventListener('DOMContentLoaded', function() {
    const volumeDisplay = document.getElementById('volume');
    const currentPhraseDisplay = document.getElementById('current-phrase');
    const completionMessage = document.getElementById('completion-message');
    const restartBtn = document.getElementById('restart-btn');
    const targetPhrase = "CHANGEVOLUME";
    let currentPhrase = "";
    let volume = 0;
    let letterInterval;

    const correctSound = document.getElementById('correctSound');
    const incorrectSound = document.getElementById('incorrectSound');



    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function addLetter(letter) {
        const letterElement = document.createElement('div');
        letterElement.textContent = letter;
        letterElement.className = 'letter';
        letterElement.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
        letterElement.style.color = getRandomColor(); // Set a random color initially

        letterElement.onclick = function() {
            if (targetPhrase[currentPhrase.length] === letter) {
                currentPhrase += letter;
                volume = Math.floor((currentPhrase.length / targetPhrase.length) * 100);
                volumeDisplay.textContent = volume;
                currentPhraseDisplay.textContent = currentPhrase.split('').join(' ') + ' _'.repeat(targetPhrase.length - currentPhrase.length);
                this.style.color = '#0f0';  // Flash green for correct choice
                correctSound.play(); // Play correct sound
                if (currentPhrase === targetPhrase) {
                    completionMessage.style.display = 'block';
                    completionMessage.textContent = 'Congratulations! Volume is set to MAX!';
                }
            } else {
                this.style.color = '#f00';  // Flash red for incorrect choice
                incorrectSound.play(); // Play incorrect sound
            }
        };
        

        document.body.appendChild(letterElement);
        setTimeout(() => document.body.removeChild(letterElement), 5000);  // Remove letter after it falls out of view
    }

    

    function startFallingLetters() {
        if (letterInterval) {
            clearInterval(letterInterval);
        }
        const targetLetters = "CHANGEVOLUME";
        let lastLetterWasTarget = false;
        letterInterval = setInterval(() => {
            let letter;
            if (lastLetterWasTarget) {
                // After a target letter, choose randomly from the entire alphabet
                letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
                lastLetterWasTarget = false;
            } else {
                // Higher chance to choose from the target phrase
                letter = targetLetters[Math.floor(Math.random() * targetLetters.length)];
                lastLetterWasTarget = true;
            }
            addLetter(letter);
        }, 250);
    }

    restartBtn.addEventListener('click', function() {
        currentPhrase = "";
        volume = 0;
        volumeDisplay.textContent = "0";
        currentPhraseDisplay.textContent = '_'.repeat(targetPhrase.length);
        completionMessage.style.display = 'none';
        startFallingLetters();  // Restart falling letters
    });

    startFallingLetters(); // Initial call to start the game
});
