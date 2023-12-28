const startBtn = document.querySelector('#start-btn');
const scoreElem = document.querySelector('#score');
const highScoreElem = document.querySelector('#high-score');
const livesElem = document.querySelector('#lives');
const gameBoard = document.querySelector('.game-board');
const header = document.querySelector('.game-header');
const footer = document.querySelector('.game-footer');

let score = 0;
let highScore = 0;
let lives = 3;
let gameStarted = false;
let bonusActive = false;
let size = 200;
let multiplier = 1;

const randomColors = [
    '#ff595e', '#ff924c', '#ffca3a', '#c5ca30', '#8ac926',
    '#36949d', '#1982c4', '#4267ac', '#565aa0', '#6a4c93',
    '#f72585', '#b5179e', '#7209b7', '#3a0ca3', '#4361ee',
    '#4cc9f0', '#7bfdc7', '#48c1d3', '#64dfdf', '#94ebcd',
    '#baff00', '#f9d423', '#ff5714', '#ff0000', '#ff4d6d'
];

function startGame() {
    multiplier = 1;
    size = 200;
    removeObj();
    score = 0;
    lives = 3;
    scoreElem.textContent = `Score: ${score}`;
    livesElem.textContent = `Lives: ${lives}`;
    gameStarted = true;
    createObject(0);
}

function createObject(bonus) {
    console.log(bonus);
    const newObj = document.createElement("div");
    newObj.id = 'circle';
    newObj.classList.add('circle');

    const randomX = Math.floor(Math.random() * (gameBoard.clientHeight - size));
    const randomY = Math.floor(Math.random() * (gameBoard.clientWidth - size));

    if(bonus === 1) {
        bonusActive = true;
        const bonusObj = document.createElement("div"); 
        bonusObj.id = 'bonus';
        bonusObj.classList.add('bonus');
        bonusObj.style.top = `${randomY}px`;
        bonusObj.style.left = `${randomX}px`;
        gameBoard.appendChild(bonusObj);
    }

    newObj.style.top = `${randomX}px`;
    newObj.style.left = `${randomY}px`;
    newObj.style.height = `${size}px`;
    newObj.style.width = `${size}px`;

    // Handle color selection
    let randomColor = Math.floor(Math.random() * randomColors.length);
    newObj.style.backgroundColor = `${randomColors[randomColor]}`;
    header.style.backgroundColor = `${randomColors[randomColor]}`;
    footer.style.backgroundColor = `${randomColors[randomColor]}`;

    gameBoard.appendChild(newObj);
}

function handleClick() {
    document.addEventListener('click', function(e) {
        if(e.target.id === 'circle') {
            removeObj();
            updateScore(false);
            if(bonusActive) {
                removeBonus();
                bonusActive = false;
            }
            createObject(Math.floor(Math.random() * 15) + 1);
            if(score % 10 === 0) {
                levelUp();
            }
        } else if(e.target.id === 'bonus') {
            updateScore(true);
            removeBonus();
            bonusActive = false;
        } else if (e.target.classList.contains('game-board')) {
            if(gameStarted) {
                if (lives > 0) {
                    lives--;
                    console.log(lives);
                    livesElem.textContent = `Lives: ${lives}`;
                }
                if (lives === 0) {
                    gameOver();
                }
            }
        }
    });
}

function levelUp() {
    if(size >= 20) {
        size -= 10;
    }
    multiplier ++;

}

function updateScore(bonus) {
    if(bonus) {
        lives++;
        livesElem.textContent = `Lives: ${lives}`;
    }
    score = score + multiplier;
    scoreElem.textContent = `Score: ${score}`;
    if(score > highScore) {
        highScore = score;
        highScoreElem.textContent = `High Score: ${score}`;
    }
}

function removeObj() {
    const circleElem = document.getElementById('circle');
    if (circleElem) {
        circleElem.remove();
    }
}

function removeBonus() {
    const bonusElem = document.getElementById('bonus');
    if(bonus) {
        bonusElem.remove();
    }
}

function gameOver() {
    removeObj();
    const gameOverText = document.createElement('p');
    gameOverText.classList.add('game-over-text');
    gameOverText.textContent = 'Game Over!';
    gameBoard.appendChild(gameOverText);
    startBtn.addEventListener("click", () => {
        gameOverText.remove();
    });
}

startBtn.addEventListener("click", startGame);
handleClick();