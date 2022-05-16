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
let currentValue = "0"; // string
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
const decimalBtn = document.querySelector("#btn-decimal");

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
  currentValue = "0";
  updateDisplay(res);
  leftOperand = res;
});

decimalBtn.addEventListener("click", () => {
  currentValue = currentValue.replace(/$|\.$/, ".");
  updateDisplay(currentValue);
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

const updateDisplay = (value) => (displayMain.textContent = value);

const appendCurrentValue = (number) => {
  if (currentValue[0] === "0") {
    currentValue = number;
  } else {
    currentValue += number;
  }
};

const clear = () => {
  currentValue = "0";
  leftOperand = null;
  currentOperation = "";
};

const backspaceCurrentValue = () => {
  currentValue = currentValue.slice(0, currentValue.length - 1);
};

const setCurrentOperation = (operation) => {
  // If left operand and current value already exist, operate
  if (leftOperand && Number(currentValue)) {
    const res = operate(currentOperation, leftOperand, Number(currentValue));
    currentValue = "0";
    updateDisplay(res);
    leftOperand = res;
  }

  currentOperation = operation;

  if (Number(currentValue)) {
    leftOperand = setOperand(currentValue);
  }
  currentValue = "0";
};

const updateDisplayPrev = () =>
  (displayPrev.innerHTML = OP_HTMLS[currentOperation]);

const setOperand = (value) => Number(value);

updateDisplay("0");
updateDisplayPrev();
