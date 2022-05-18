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

const OPSYMBOL_TO_CONSTANT = {
  "+": ADD,
  "-": SUBTRACT,
  "/": DIVIDE,
  "*": MULTIPLY,
};

let currentValue = 0; // number
let leftOperand = null; // number | null
let currentOperation = ""; // string
let decimalMode = false;

// DOM ELEMENTS
const digitBtns = document.querySelectorAll(".btn-digit");
const displayMain = document.querySelector("#display-main");
const displayPrev = document.querySelector("#display-prev");
const deleteBtn = document.querySelector("#btn-delete");
const clearBtn = document.querySelector("#btn-clear");
const operationBtns = document.querySelectorAll(".btn-operation");
const equalBtn = document.querySelector("#btn-equal");
const decimalBtn = document.querySelector("#btn-decimal");
const signBtn = document.querySelector("#btn-sign");

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
  });
});

const handleEqual = () => {
  if (leftOperand && currentValue) {
    updateDisplayPrev(
      `${leftOperand} ${OP_HTMLS[currentOperation]} ${currentValue} =`
    );
    evaluate();
  }
};

equalBtn.addEventListener("click", handleEqual);

const handleDecimal = () => {
  if (leftOperand && !currentOperation) {
    updateDisplayPrev("");
    clear();
  }
  decimalMode = true;
  updateDisplay(currentValue + ".");
};

decimalBtn.addEventListener("click", handleDecimal);

signBtn.addEventListener("click", () => {
  if (currentValue) {
    currentValue = -currentValue;
    updateDisplay(currentValue);
  } else {
    leftOperand = -leftOperand;
    updateDisplay(leftOperand);
  }
});

const handleDelete = () => {
  backspaceCurrentValue();
  updateDisplay(currentValue);
};

deleteBtn.addEventListener("click", handleDelete);

clearBtn.addEventListener("click", () => {
  clear();
  updateDisplay(currentValue);
  updateDisplayPrev("");
});

// KEYBOARD SUPPORT
document.addEventListener("keydown", (event) => {
  var key = event.key;
  var code = event.code;
  if (key >= 0 && key <= 9) {
    appendCurrentValue(key);
    updateDisplay(currentValue);
  } else if (key === ".") {
    handleDecimal();
  } else if (Object.keys(OPSYMBOL_TO_CONSTANT).includes(key)) {
    setCurrentOperation(OPSYMBOL_TO_CONSTANT[key]);
  } else if (key === "=" || key === "Enter") {
    handleEqual();
  } else if (key === "Backspace" || key === "Delete") {
    handleDelete();
  }
});

const operate = (operation, n1, n2) => {
  let res = 0;
  switch (operation) {
    case ADD:
      res = n1 + n2;
      break;
    case SUBTRACT:
      res = n1 - n2;
      break;
    case DIVIDE:
      res = n1 / n2;
      break;
    case MULTIPLY:
      res = n1 * n2;
      break;
    default:
      break;
  }
  return Math.round(res * 1000) / 1000;
};

const updateDisplay = (value) => (displayMain.textContent = value);

const appendCurrentValue = (number) => {
  if (currentValue === 0) {
    currentValue = Number(
      decimalMode ? setDecimal(currentValue, number) : number
    );
  } else if (String(currentValue).length + 1 > 10) {
    currentValue = 999999999999;
  } else {
    const currentValueString = String(currentValue);
    currentValue = Number(
      decimalMode
        ? setDecimal(currentValue, number)
        : currentValueString + number
    );
  }
  if (decimalMode) decimalMode = false;
};

const setDecimal = (value, decimal) => {
  decimalMode = false;
  const stringValue = String(value);
  if (stringValue.match(/\./)) return `${stringValue}${decimal}`;
  return Number(`${stringValue}.${decimal}`);
};

const clear = () => {
  currentValue = 0;
  leftOperand = null;
  currentOperation = "";
  decimalMode = false;
};

const backspaceCurrentValue = () => {
  const currentValueString = String(currentValue);
  currentValue = Number(
    currentValueString.length <= 1
      ? 0
      : currentValueString.slice(0, currentValueString.length - 1)
  );
};

const setCurrentOperation = (operation) => {
  // If left operand and current value already exist, evaluate with previous operation
  if (leftOperand && currentValue) {
    evaluate();
  }

  updateDisplayPrev(`${leftOperand || currentValue} ${OP_HTMLS[operation]}`);

  currentOperation = operation;

  if (currentValue) {
    leftOperand = setOperand(currentValue);
  }
  currentValue = 0;
};

const updateDisplayPrev = (value) => (displayPrev.innerHTML = value);

const setOperand = (value) => Number(value);

const evaluate = () => {
  if (currentOperation === DIVIDE && currentValue === 0) {
    updateDisplay("ERROR");
    clear();
    return;
  }
  const res = operate(currentOperation, leftOperand, currentValue);
  currentValue = 0;
  updateDisplay(res);
  leftOperand = res;
  currentOperation = "";
};

updateDisplay(0);
