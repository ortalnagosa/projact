const resetButton = document.getElementById('reset-button');
const board = document.getElementById('board');
const scoreDisplay1 = document.getElementById('score1');
const scoreDisplay2 = document.getElementById('score2');
const timerDisplay = document.getElementById('timer');
const turnDisplay = document.getElementById('turn');
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let currentRound = 1;
let playerTurn = 1;
let player1Name = '';
let player2Name = '';
let score1 = 0;
let score2 = 0;
let timer = 60;
let interval;
let gameOver = false;

const pokemonImages = [
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', // Bulbasaur
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png', // Ivysaur
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png', // Venusaur
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png', // Charmander
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png', // Charmeleon
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png', // Charizard
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png', // Squirtle
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png', // Wartortle
];

function promptForPlayerNames() {
  player1Name = prompt('הקלד שם שחקן');
  player2Name = prompt('הקלד שם שחקן יריב');
  if (!player1Name || !player2Name) {
    alert('יש למלא את כל שמות השחקנים');
    promptForPlayerNames();  
  } else {
    startGame();
  }
}

function startGame() {
  score1 = 0;
  score2 = 0;
  scoreDisplay1.textContent = `${player1Name} Score: ${score1}`;
  scoreDisplay2.textContent = `${player2Name} Score: ${score2}`;
  currentRound = 1;
  playerTurn = 1;
  matchedCards = 0;
  turnDisplay.textContent = `${player1Name}'s Turn`;
  resetRound();
}

function shuffleCards() {
  const pairs = [...pokemonImages, ...pokemonImages];
  return pairs.sort(() => Math.random() - 0.5);
}

function createCards() {
  const shuffledCards = shuffleCards();
  board.innerHTML = '';
  shuffledCards.forEach((imageUrl, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-index', index);

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = '?';

    const back = document.createElement('div');
    back.classList.add('back');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Pokemon ${index + 1}`;
    back.appendChild(img);

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (gameOver || card.classList.contains('flipped') || flippedCards.length === 2) {
    return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  const firstImage = firstCard.querySelector('.back img').src;
  const secondImage = secondCard.querySelector('.back img').src;

  if (firstImage === secondImage) {
    matchedCards += 2;
    if (playerTurn === 1) {
      score1 += 10;
      scoreDisplay1.textContent = `${player1Name} Score: ${score1}`;
    } else {
      score2 += 10;
      scoreDisplay2.textContent = `${player2Name} Score: ${score2}`;
    }

    if (matchedCards === pokemonImages.length * 2) {
      setTimeout(() => {
        if (score1 > score2) {
          alert(`${player1Name} wins!`);
        } else if (score2 > score1) {
          alert(`${player2Name} wins!`);
        } else {
          alert('It\'s a draw!');
        }
      }, 100);
      gameOver = true;
    }

    flippedCards = [];
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      flippedCards = [];
      playerTurn = playerTurn === 1 ? 2 : 1; // Change turn
      turnDisplay.textContent = `${playerTurn === 1 ? player1Name : player2Name}'s Turn`; // Update who is playing
      resetTimer();
    }, 1000);
  }
}

function startTimer() {
  interval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(interval);
      setTimeout(() => {
        playerTurn = playerTurn === 1 ? 2 : 1; // Switch turn
        turnDisplay.textContent = `${playerTurn === 1 ? player1Name : player2Name}'s Turn`;
        resetTimer();
      }, 1000);
    } else {
      timer--;
      timerDisplay.textContent = `Time: ${timer}s`;
    }
  }, 1000);
}

function resetTimer() {
  timer = 60;
  timerDisplay.textContent = `Time: ${timer}s`;
  startTimer();
}

function resetRound() {
  matchedCards = 0;
  flippedCards = [];
  createCards();
  startTimer();
}

resetButton.addEventListener('click', () => {
  gameOver = false;
  promptForPlayerNames(); // Start game after getting player names
});

// התחלת המשחק
promptForPlayerNames();
