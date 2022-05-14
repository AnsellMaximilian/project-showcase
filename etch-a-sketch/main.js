let isRainbowMode = false;

const root = document.querySelector(":root");

const grid = document.querySelector("#grid");

// Grid size prompt
const gridSizeUpdateBtn = document.querySelector("#grid-size-prompt button");
const gridSizeInput = document.querySelector("#grid-size-input");
const gridSizeInputValue = document.querySelector("#grid-size-prompt span");

const resetBtn = document.querySelector("#reset-btn");

const randomColorBtn = document.querySelector("#random-color-btn");

randomColorBtn.addEventListener("click", () => {
  isRainbowMode = !isRainbowMode;
  randomColorBtn.classList.toggle("random-color-btn--on");
});

resetBtn.addEventListener("click", () => resetTiles());

gridSizeInput.addEventListener(
  "input",
  (e) => (gridSizeInputValue.textContent = e.target.value)
);

gridSizeUpdateBtn.addEventListener("click", () => {
  const newSize = parseInt(gridSizeInput.value);
  if (isNaN(newSize)) {
  } else if (newSize > 64 || newSize < 1) {
  } else {
    root.style.setProperty("--grid-dimensions", newSize);
    buildGrid(newSize);
  }
});

const buildGrid = (size) => {
  grid.innerHTML = "";
  for (let i = 1; i <= size * size; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.addEventListener("mouseover", (e) => {
      if (isRainbowMode) {
        e.target.style.backgroundColor = getRandomRGBColor();
      } else {
        e.target.classList.add("tile--painted");
        e.target.style.backgroundColor = "";
      }
    });
    grid.append(tile);
  }
};

const resetTiles = () =>
  document
    .querySelectorAll(".tile")
    .forEach((tile) => tile.classList.remove("tile--painted"));

const getRandomRGBColor = () =>
  `rgb(${getRandomRGBValue()}, ${getRandomRGBValue()}, ${getRandomRGBValue()})`;

const getRandomRGBValue = () => Math.floor(Math.random() * 256);

buildGrid(16);
