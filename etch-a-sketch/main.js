const grid = document.querySelector("#grid");

for (let i = 1; i <= 16 * 16; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.addEventListener("mouseover", (e) =>
    e.target.classList.add("tile--painted")
  );
  grid.append(tile);
}
