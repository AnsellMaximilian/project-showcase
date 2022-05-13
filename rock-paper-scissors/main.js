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

// DOM
const btnRock = document.querySelector("#btn-rock");
const btnPaper = document.querySelector("#btn-paper");
const btnScissors = document.querySelector("#btn-scissors");

const onChoiceBtnClick = (choice) => {
  const computerChoice = getRandomChoice();
  const res = playRound(choice, computerChoice);
  console.log(res);
};

btnRock.addEventListener("click", () => onChoiceBtnClick(ROCK));
btnPaper.addEventListener("click", () => onChoiceBtnClick(PAPER));
btnScissors.addEventListener("click", () => onChoiceBtnClick(SCISSORS));

const getRandomChoice = () => choicesArray[Math.floor(Math.random() * 3)];

const getComputerChoice = () => getRandomChoice();

const validateChoice = (choice) => choicesArray.includes(choice);

const playRound = (playerSelection, computerSelection) => {
  const isPlayerWinner = beatTable[playerSelection][computerSelection];
  const isDraw = isPlayerWinner === null;
  if (isDraw) return `Draw!`;
  return `You ${isPlayerWinner ? "Win" : "Lose"}! ${
    isPlayerWinner ? playerSelection : computerSelection
  } beats ${isPlayerWinner ? computerSelection : playerSelection}`;
};
