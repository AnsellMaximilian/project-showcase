const OPERATIONS = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  DIVIDE: "DIVIDE",
  MULTIPLY: "MULTIPLY",
  EQUAL: "EQUAL",
};

const { ADD, SUBTRACT, DIVIDE, MULTIPLY, EQUAL } = OPERATIONS;

const OP_HTMLS = {
  [ADD]: "&plus;",
  [SUBTRACT]: "&minus;",
  [DIVIDE]: "&divide;",
  [MULTIPLY]: "&times;",
  [EQUAL]: "&equals;",
};

// For easy concatenation, this will be a string. Whenever needed, it will be converted to number
let currentValue = ""; // string
let leftOperand = null; // number | null
let currentOperation = ""; // string

// DOM ELEMENTS
const digitBtns = document.querySelectorAll(".btn-digit");
const displayMain = document.querySelector("#display-main");
const displayPrev = document.querySelector("#display-prev");
const deleteBtn = document.querySelector("#btn-delete");
const clearBtn = document.querySelector("#btn-clear");
const operationBtns = document.querySelectorAll(".btn-operation");
const equalBtn = document.querySelector("#btn-equal");

// LISTENERS
digitBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    appendCurrentValue(e.target.dataset.value);
    updateDisplay(currentValue);
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    setCurrentOperation(e.target.dataset.value);
    updateDisplayPrev();
  });
});

equalBtn.addEventListener("click", () => {
  const res = operate(currentOperation, leftOperand, Number(currentValue));
  currentValue = "";
  updateDisplay(res);
  leftOperand = res;
});

deleteBtn.addEventListener("click", () => {
  backspaceCurrentValue();
  updateDisplay(currentValue);
});

clearBtn.addEventListener("click", () => {
  clear();
  updateDisplay(currentValue);
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

const updateDisplay = (value) => (displayMain.textContent = value || "0");

const appendCurrentValue = (number) => {
  currentValue += number;
};

const clear = () => {
  currentValue = "";
  leftOperand = null;
  currentOperation = "";
};

const backspaceCurrentValue = () => {
  currentValue = currentValue.slice(0, currentValue.length - 1);
};

const setCurrentOperation = (operation) => {
  currentOperation = operation;

  // If left operand and current value already exist, operate
  if (leftOperand && currentValue) {
    const res = operate(operation, leftOperand, Number(currentValue));
    currentValue = "";
    updateDisplay(res);
    leftOperand = res;
  }

  if (currentValue) {
    leftOperand = setOperand(currentValue);
  }
  currentValue = "";
};

const updateDisplayPrev = () =>
  (displayPrev.innerHTML = OP_HTMLS[currentOperation]);

const setOperand = (value) => Number(value);

updateDisplay();
updateDisplayPrev();
