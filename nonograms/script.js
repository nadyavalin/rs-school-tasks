/* global document */
// eslint-disable-next-line import/extensions
import templates from "./templates.js";

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

const currentTemplate = templates[0];

function fillGridWithTemplate(template) {
  const gridCells = document.querySelectorAll(".grid-cell");
  for (let i = 0; i < template.length; i += 1) {
    for (let j = 0; j < template[i].length; j += 1) {
      if (template[i][j] === 1) {
        gridCells[i * 5 + j].classList.add("hidden");
      }
    }
  }
}

function toggleCellState(cell) {
  if (!cell.classList.contains("hidden")) {
    cell.classList.toggle("crossed");
  }
  if (cell.classList.contains("hidden")) {
    cell.classList.toggle("guessed");
  }
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("grid-cell")) {
    toggleCellState(event.target);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  generateGrid(5, 5);
  fillGridWithTemplate(currentTemplate);
});
