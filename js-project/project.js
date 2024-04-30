document.addEventListener('DOMContentLoaded', function() {
    const volumeDisplay = document.getElementById('volume');
    const currentPhraseDisplay = document.getElementById('current-phrase');
    const completionMessage = document.getElementById('completion-message');
    const restartBtn = document.getElementById('restart-btn');
    const targetPhrase = "CHANGEVOLUME";
    let currentPhrase = "";
    let volume = 0;
    let letterInterval;
    let hasPlayedSound = false;

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

    function playSound(sound) {
        sound.pause();
        sound.currentTime = 0;
        sound.play();
    }

    function stopSound(sound) {
        sound.pause();
        sound.currentTime = 0;
    }

    function addLetter(letter) {
        const letterElement = document.createElement('div');
        letterElement.textContent = letter;
        letterElement.className = 'letter';
        letterElement.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
        letterElement.style.color = getRandomColor(); 

        letterElement.onclick = function() {
            if (!hasPlayedSound) {
                playSound(correctSound);
                hasPlayedSound = true;
            }

            if (targetPhrase[currentPhrase.length] === letter) {
                currentPhrase += letter;
                volume = Math.floor((currentPhrase.length / targetPhrase.length) * 100);
                volumeDisplay.textContent = volume;
                currentPhraseDisplay.textContent = currentPhrase.split('').join(' ') + ' _'.repeat(targetPhrase.length - currentPhrase.length);
                this.style.color = '#0f0';
                if (currentPhrase === targetPhrase) {
                    completionMessage.style.display = 'block';
                    completionMessage.textContent = 'Congratulations! Volume is set to MAX!';
                }
            } else {
                this.style.color = '#f00';
            }
        };

        document.body.appendChild(letterElement);
        setTimeout(() => {
            if (letterElement.parentNode) {
                document.body.removeChild(letterElement);
            }
        }, 5000);
    }

    function startFallingLetters() {
        clearInterval(letterInterval);
        letterInterval = setInterval(() => {
            let letter;
            if (Math.random() < 0.7) { 
                letter = targetPhrase[Math.floor(Math.random() * targetPhrase.length)];
            } else {  
                letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
            }
            addLetter(letter);
        }, 250);
    }

    function clearFallingLetters() {
        const existingLetters = document.querySelectorAll('.letter');
        existingLetters.forEach(letter => {
            if (letter.parentNode) {
                letter.parentNode.removeChild(letter);
            }
        });
    }

    function restartGame() {
        stopSound(correctSound); 
        currentPhrase = "";
        volume = 0;
        volumeDisplay.textContent = "0";
        currentPhraseDisplay.textContent = '_'.repeat(targetPhrase.length);
        completionMessage.style.display = 'none';
        clearFallingLetters();
        clearInterval(letterInterval);
        hasPlayedSound = false;
        startFallingLetters(); 
    }

    restartBtn.addEventListener('click', restartGame);

    startFallingLetters(); 
});
