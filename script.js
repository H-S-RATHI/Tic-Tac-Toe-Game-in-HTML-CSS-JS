// script.js
let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
const cells = document.querySelectorAll('[data-cell]');
const status = document.querySelector('[data-status]');
const restartButton = document.querySelector('[data-restart]');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            const winner = gameBoard[a];
            status.textContent = `${winner} wins!`; 
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            audioTurn.pause();
            gameover.play();
        }
    }
    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        status.textContent = "It's a draw!";
    }
};

const handleCellClick = (cell, index) => {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        audioTurn.play();
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWinner();
    }
};

const restartGame = () => {
    gameover.pause();
    gameover.currentTime = 0;
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner');
    });
    status.textContent = '';
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));
});

restartButton.addEventListener('click', restartGame);
