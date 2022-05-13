const choices = {
  ROCK: "ROCK",
  PAPER: "PAPER",
  SCISSORS: "SCISSORS",
};

const { ROCK, PAPER, SCISSORS } = choices;

const beatTable = {
  // Null indicates draw
  [ROCK]: {
    [PAPER]: false,
    [SCISSORS]: true,
    [ROCK]: null,
  },
  [PAPER]: {
    [ROCK]: true,
    [SCISSORS]: false,
    [PAPER]: null,
  },
  [SCISSORS]: {
    [PAPER]: true,
    [ROCK]: false,
    [SCISSORS]: null,
  },
};

const choicesArray = [ROCK, PAPER, SCISSORS];

// SCORE VARIABLES
let playerScore = 0;
let computerScore = 0;

// DOM
const btnRock = document.querySelector("#btn-rock");
const btnPaper = document.querySelector("#btn-paper");
const btnScissors = document.querySelector("#btn-scissors");

const playerScoreDisplay = document.querySelector("#scoreboard_player_score");
const computerScoreDisplay = document.querySelector(
  "#scoreboard_computer_score"
);

const announcement = document.querySelector("#announcement");

btnRock.addEventListener("click", () => playRound(ROCK, getComputerChoice()));
btnPaper.addEventListener("click", () => playRound(PAPER, getComputerChoice()));
btnScissors.addEventListener("click", () =>
  playRound(SCISSORS, getComputerChoice())
);

const getRandomChoice = () => choicesArray[Math.floor(Math.random() * 3)];

const getComputerChoice = () => getRandomChoice();

const validateChoice = (choice) => choicesArray.includes(choice);

const playRound = (playerSelection, computerSelection) => {
  const isPlayerWinner = beatTable[playerSelection][computerSelection];

  const isDraw = isPlayerWinner === null;

  if (isDraw) {
    announcement.textContent = `Draw!`;
  } else {
    isPlayerWinner ? playerScore++ : computerScore++;

    announcement.textContent = `You ${isPlayerWinner ? "Win" : "Lose"}! ${
      isPlayerWinner ? playerSelection : computerSelection
    } beats ${isPlayerWinner ? computerSelection : playerSelection}`;
  }
  updateScoreboard();
  checkWin();
};

const updateScoreboard = () => {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
};

const checkWin = () => {
  if (playerScore === 5) {
    announcement.textContent = "YOU WON THE GAME!";
  } else if (computerScore === 5) {
    announcement.textContent = "YOU LOST!";
  }
};

updateScoreboard();
