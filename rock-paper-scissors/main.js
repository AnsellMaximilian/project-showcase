const choices = {
  ROCK: "ROCK",
  PAPER: "PAPER",
  SCISSORS: "SCISSORS",
};

const RECORD_KEYS = {
  PLAYER_RECORD: "rps-player-record",
  COMPUTER_RECORD: "rps-computer-record",
};

const { PLAYER_RECORD, COMPUTER_RECORD } = RECORD_KEYS;

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

let drawCount = 0;

// DOM
const btnRock = document.querySelector("#btn-rock");
const btnPaper = document.querySelector("#btn-paper");
const btnScissors = document.querySelector("#btn-scissors");

const playerScoreDisplay = document.querySelector("#scoreboard_player_score");
const computerScoreDisplay = document.querySelector(
  "#scoreboard_computer_score"
);

const announcement = document.querySelector("#announcement");
const resetPrompt = document.querySelector("#reset-prompt");
const resetButton = resetPrompt.querySelector("button");

btnRock.addEventListener("click", () => playRound(ROCK, getComputerChoice()));
btnPaper.addEventListener("click", () => playRound(PAPER, getComputerChoice()));
btnScissors.addEventListener("click", () =>
  playRound(SCISSORS, getComputerChoice())
);

resetButton.addEventListener("click", () => resetGame());

const getRandomChoice = () => choicesArray[Math.floor(Math.random() * 3)];

const getComputerChoice = () => getRandomChoice();

const validateChoice = (choice) => choicesArray.includes(choice);

const playRound = (playerSelection, computerSelection) => {
  const isPlayerWinner = beatTable[playerSelection][computerSelection];

  const isDraw = isPlayerWinner === null;

  if (isDraw) {
    updateAnnouncement(
      `Draw!${++drawCount > 1 ? ` ${drawCount} in a row!` : ""}`
    );
  } else {
    drawCount = 0;
    isPlayerWinner ? playerScore++ : computerScore++;

    updateAnnouncement(
      `You ${isPlayerWinner ? "Win" : "Lose"}! ${
        isPlayerWinner ? playerSelection : computerSelection
      } beats ${isPlayerWinner ? computerSelection : playerSelection}`
    );
  }
  updateScoreboard();
  checkWin();
};

const updateScoreboard = () => {
  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;
};

const updateAnnouncement = (text) => (announcement.textContent = text);

const displayResetPrompt = () => (resetPrompt.style.display = "block");
const hideResetPrompt = () => (resetPrompt.style.display = "none");

const resetGame = () => {
  playerScore = 0;
  computerScore = 0;
  updateAnnouncement("Choose Rock, Paper, or Scissors");
  updateScoreboard();
  hideResetPrompt();
  enableButtons();
};

const disableButtons = () => {
  btnRock.disabled = true;
  btnPaper.disabled = true;
  btnScissors.disabled = true;
};

const enableButtons = () => {
  btnRock.disabled = false;
  btnPaper.disabled = false;
  btnScissors.disabled = false;
};

const checkWin = () => {
  if (playerScore === 5) {
    updateAnnouncement("YOU WON THE GAME!");
    localStorage.setItem(
      PLAYER_RECORD,
      Number(localStorage.getItem(PLAYER_RECORD)) + 1
    );
  } else if (computerScore === 5) {
    updateAnnouncement("YOU LOST!");
    localStorage.setItem(
      COMPUTER_RECORD,
      Number(localStorage.getItem(COMPUTER_RECORD)) + 1
    );
  } else {
    return;
  }
  displayResetPrompt();
  updateRecord();
  disableButtons();
};

const updateRecord = () => {
  const playerRecordDisplay = document.querySelector("#record--player__score");
  const computerRecordDisplay = document.querySelector(
    "#record--computer__score"
  );

  const playerRecord = localStorage.getItem(PLAYER_RECORD) || 0;
  const computerRecord = localStorage.getItem(COMPUTER_RECORD) || 0;

  playerRecordDisplay.textContent = playerRecord;
  computerRecordDisplay.textContent = computerRecord;
};

updateScoreboard();
updateRecord();
