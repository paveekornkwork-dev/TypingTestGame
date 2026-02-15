document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('game-board');
    const wordInput = document.getElementById('word-input');
    const scoreDisplay = document.getElementById('score');
    const livesDisplay = document.getElementById('lives');
    const pauseButton = document.getElementById('pause-button');

    const words = ["database","html","class","java","computer","error","pixel","ram","blockchain","infographic","cybercrime","ai","algorithm","monitor","downloads","software","virus","hardware","animation","digital","header","input","output","memory","windows ","website","user","compile","cpu","function","mainboard","import","program","upload","programmer","scale","css","cs4773","variable","method","strings","operator","arithmetic","operands","array", "boolean","loop","version","keyword","types","if", "else","while","for","switch","random","sort","template", "object", "format", "python", "w3schools", "vr","internet","cache","technology", "ui", "ux", "file", "svg", "bitmap" , "demo", "rotation" , "translation", "package ", "unity", "export ", "metaverse ", "system", "process", "com-sci", "cg", "flowchart ", "game", "visible" , "demo", "images", "coding", "ar ", "inkscape",  "webpage ", "develop", "node", "icon", "canvas ", "desktop", "microsoft", "console", "void"];
    let activeWords = [];
    let score = 0;
    let lives = 5;
    let wordSpeed = 4; // Speed of words falling down the screen
    let gameInterval;
    let moveInterval;
    let isPaused = false; // Pause state

    // Load sound effects
    const correctSound = new Audio('assets/correct.mp3');
    const wrongSound = new Audio('assets/wrong.mp3');

    function addWord() {
        const wordText = words[Math.floor(Math.random() * words.length)];
        const wordElement = document.createElement('div');
        wordElement.classList.add('word');
        wordElement.innerText = wordText;
        wordElement.style.left = `${Math.random() * (gameBoard.clientWidth - 50)}px`; // Random horizontal position
        wordElement.style.top = '0px'; // Start at the top
        gameBoard.appendChild(wordElement);
        activeWords.push(wordElement);
    }

    function moveWords() {
        activeWords.forEach(wordElement => {
            let currentTop = parseFloat(wordElement.style.top);
            wordElement.style.top = `${currentTop + wordSpeed}px`;

            // Remove the word if it reaches the bottom of the screen
            if (currentTop + wordElement.offsetHeight >= gameBoard.clientHeight) {
                removeWord(wordElement);
                lives--;
                livesDisplay.textContent = `Lives: ${lives}`;
                wrongSound.play(); // Play wrong sound
                if (lives <= 0) {
                    gameOver();
                }
            }
        });
    }

    function removeWord(wordElement) {
        activeWords = activeWords.filter(el => el !== wordElement);
        wordElement.remove();
    }

    function gameOver() {
        clearInterval(gameInterval);
        clearInterval(moveInterval);
        alert('Game Over! Your score is: ' + score);
        resetGame();
    }

    function resetGame() {
        activeWords.forEach(word => word.remove());
        activeWords = [];
        score = 0;
        lives = 5;
        wordSpeed = 1;
        scoreDisplay.textContent = `Score: ${score}`;
        livesDisplay.textContent = `Lives: ${lives}`;
        isPaused = false;
        pauseButton.textContent = 'Pause';
        startGame(); // Restart the game after reset
    }

    function togglePause() {
        if (isPaused) {
            // Resume the game
            startGame();
            pauseButton.textContent = 'Pause';
        } else {
            // Pause the game
            clearInterval(gameInterval);
            clearInterval(moveInterval);
            pauseButton.textContent = 'Resume';
        }
        isPaused = !isPaused;
    }

    function startGame() {
        gameInterval = setInterval(() => {
            addWord();
        }, 2000); // Add a new word every 2 seconds

        moveInterval = setInterval(() => {
            moveWords();
        }, 100); // Move words every 100ms
    }


    wordInput.addEventListener('input', () => {
        const typedWord = wordInput.value.trim();
        activeWords.forEach(wordElement => {
            if (wordElement.innerText === typedWord) {
                removeWord(wordElement);
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;
                wordInput.value = '';

                // Play correct sound
                correctSound.play();

                // Increase speed after every correct word
                wordSpeed += 0.1;
            }
        });
    });

    pauseButton.addEventListener('click', togglePause);

    startGame(); // Start the game when the page loads
});
