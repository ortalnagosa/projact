let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
  const index = event.target.getAttribute('data-index');
  if (board[index] || gameOver) return; // Ignore if cell is already filled or game is over
  
  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  if (checkWinner()) {
    setTimeout(() => alert(`${currentPlayer} wins!`), 100);
    gameOver = true;
    return;
  }
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
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

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return board.every(cell => cell !== ''); // Check if board is full (draw)
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'X';
}



