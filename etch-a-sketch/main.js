const root = document.querySelector(":root");

const grid = document.querySelector("#grid");

// Grid size prompt
const gridSizeUpdateBtn = document.querySelector("#grid-size-prompt button");
const gridSizeInput = document.querySelector("#grid-size-input");

const resetBtn = document.querySelector("#reset-btn");

resetBtn.addEventListener("click", () => resetTiles());

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
    tile.addEventListener("mouseover", (e) =>
      e.target.classList.add("tile--painted")
    );
    grid.append(tile);
  }
};

const resetTiles = () =>
  document
    .querySelectorAll(".tile")
    .forEach((tile) => tile.classList.remove("tile--painted"));

buildGrid(16);
