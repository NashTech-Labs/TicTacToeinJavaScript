const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.querySelector('.status-message');
const restartButton = document.querySelector('.restart-button');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
 
let isXNext = true;
let board = Array(9).fill(null);
 
const handleClick = (e) => {
    const cell = e.target;
    const currentClass = isXNext ? 'X' : 'O';
    const cellIndex = [...cells].indexOf(cell);
 
    if (cell.textContent || checkWinner()) return;
 
    cell.textContent = currentClass;
    board[cellIndex] = currentClass;
    if (checkWinner()) {
        statusMessage.textContent = `${currentClass} Wins!`;
    } else if (board.every(cell => cell)) {
        statusMessage.textContent = 'Draw!';
    } else {
        isXNext = !isXNext;
        statusMessage.textContent = `Next Player: ${isXNext ? 'X' : 'O'}`;
    }
};
 
const checkWinner = () => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] && board[index] === board[combination[0]];
        });
    });
};
 
const restartGame = () => {
    board = Array(9).fill(null);
    isXNext = true;
    cells.forEach(cell => cell.textContent = '');
    statusMessage.textContent = 'Next Player: X';
};
 
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
 