let isRainbowMode = false;
let color = "black";

const root = document.querySelector(":root");

const grid = document.querySelector("#grid");

// Grid size prompt
const gridSizeUpdateBtn = document.querySelector("#grid-size-prompt button");
const gridSizeInput = document.querySelector("#grid-size-input");
const gridSizeInputValue = document.querySelector("#grid-size-prompt span");
const resetBtn = document.querySelector("#reset-btn");
const guideBtn = document.querySelector("#guide-btn");
const randomColorBtn = document.querySelector("#random-color-btn");

const colorInput = document.querySelector("#color-input");

document.body.addEventListener("contextmenu", (e) => e.preventDefault());

colorInput.addEventListener("change", (e) => (color = e.target.value));

grid.addEventListener("mouseover", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("tile")) {
    if (e.buttons === 1) paintTile(e.target);
    if (e.buttons === 2) clearTile(e.target);
  }
});

randomColorBtn.addEventListener("click", () => {
  isRainbowMode = !isRainbowMode;
  randomColorBtn.classList.toggle("random-color-btn--on");
});

guideBtn.addEventListener("click", (e) => {
  e.target.classList.toggle("btn--on");
  grid.classList.toggle("guidelines");
});

resetBtn.addEventListener("click", () => resetTiles());

gridSizeInput.addEventListener(
  "input",
  (e) =>
    (gridSizeInputValue.textContent = e.target.value + "x" + e.target.value)
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
    tile.setAttribute("draggable", false);
    tile.classList.add("tile");
    tile.addEventListener("click", (e) => {
      paintTile(e.target);
    });
    tile.addEventListener("contextmenu", (e) => {
      console.log(e.buttons);
      e.preventDefault();
      clearTile(e.target);
      return false;
    });
    tile.addEventListener("dragstart", (e) => e.preventDefault());
    tile.addEventListener("drop", (e) => e.preventDefault());
    grid.append(tile);
  }
};

const paintTile = (tile) => {
  if (isRainbowMode) {
    tile.style.backgroundColor = getRandomRGBColor();
  } else {
    tile.style.backgroundColor = color;
  }
};

const clearTile = (tile) => {
  tile.style.backgroundColor = "transparent";
};

const resetTiles = () =>
  document.querySelectorAll(".tile").forEach((tile) => {
    tile.classList.remove("tile--painted");
    tile.style.backgroundColor = "";
  });

const getRandomRGBColor = () =>
  `rgb(${getRandomRGBValue()}, ${getRandomRGBValue()}, ${getRandomRGBValue()})`;

const getRandomRGBValue = () => Math.floor(Math.random() * 256);

buildGrid(16);
