/* global document */
function generateGrid(rows, cols) {
  const gridContainer = document.createElement("div");
  gridContainer.classList.add("grid-container");

  for (let i = 0; i < rows; i += 1) {
    const row = document.createElement("div");
    row.classList.add("grid-row");
    for (let j = 0; j < cols; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      row.append(cell);
    }
    gridContainer.append(row);
  }

  document.body.append(gridContainer);
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    event.target.classList.toggle("checked");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  generateGrid(5, 5);
});
