const OPERATIONS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  DIVIDE: "DIVIDE",
  MULTIPLY: "MULTIPLY",
};

const { ADD, SUBTRACT, DIVIDE, MULTIPLY } = OPERATIONS;

// For easy concatenation, this will be a string. Whenever needed, it will be converted to number
let currentValue = "";
let currentOperation = "";

// DOM ELEMENTS
const digitBtns = document.querySelectorAll(".btn-digit");
const displayMain = document.querySelector("#display-main");
const displayPrev = document.querySelector("#display-prev");
const deleteBtn = document.querySelector("#btn-delete");
const clearBtn = document.querySelector("#btn-clear");
const operationBtn = document.querySelectorAll(".btn-operation");

// LISTENERS
digitBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    appendCurrentValue(e.target.dataset.value);
    updateDisplay();
  });
});

operationBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    setCurrentOperation(e.target.dataset.value);
    updateDisplayPrev();
  });
});

deleteBtn.addEventListener("click", () => {
  backspaceCurrentValue();
  updateDisplay();
});

clearBtn.addEventListener("click", () => {
  clearCurrentValue();
  updateDisplay();
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

const updateDisplay = () => (displayMain.textContent = currentValue || "0");

const appendCurrentValue = (number) => (currentValue += number);

const clearCurrentValue = () => (currentValue = "");

const backspaceCurrentValue = () => {
  currentValue = currentValue.slice(0, currentValue.length - 1);
  //   if (currentValue.length <= 0) currentValue = "0";
};

const setCurrentOperation = (operation) => (currentOperation = operation);

const updateDisplayPrev = () => (displayPrev.textContent = currentOperation);
