const OPERATIONS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  DIVIDE: "DIVIDE",
  MULTIPLY: "MULTIPLY",
};

const { ADD, SUBTRACT, DIVIDE, MULTIPLY } = OPERATIONS;

// For easy concatenation, this will be a string. Whenever needed, it will be converted to number
let currentValue = "";

// DOM ELEMENTS
const digitBtns = document.querySelectorAll(".btn-digit");
const displayMain = document.querySelector("#display-main");

// LISTENERS
digitBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    appendCurrentValue(e.target.dataset.value);
    updateDisplay();
  });
});

const operate = (operation, n1, n2) => {
  switch (operation) {
    case ADD:
      return n1 + n2;
    case SUBTRACT:
      return n1 - n2;
    case DIVIDE:
      return n1 / n2;
    case MULTIPLY:
      return n1 * n2;
    default:
      break;
  }
};

const updateDisplay = () => (displayMain.textContent = currentValue);

const appendCurrentValue = (number) => (currentValue += number);
