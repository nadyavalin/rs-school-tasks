/* global document */
// eslint-disable-next-line import/extensions
import templates from "./templates.js";

// Общий контейнер
const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

// Подсказки по горизонтали
function generateHintsHorizontal(template) {
  const hintsContainerHorizontal = document.createElement("div");
  hintsContainerHorizontal.classList.add("hints-container-horizontal");

  for (let i = 0; i < template.length; i += 1) {
    let count = 0;
    let hintsValue = "";
    for (let j = 0; j < template[i].length; j += 1) {
      if (template[i][j] === 1) {
        count += 1;
      } else if (count > 0) {
        hintsValue += `${count} `;
        count = 0;
      }
    }
    if (count > 0) {
      hintsValue += count;
    }
    const hints = document.createElement("div");
    hints.classList.add("hint");
    hints.textContent = hintsValue;
    hintsContainerHorizontal.append(hints);
  }
  return hintsContainerHorizontal;
}

// Подсказки по вертикали
function generateHintsVertical(template) {
  const hintsContainerVertical = document.createElement("div");
  hintsContainerVertical.classList.add("hints-container-vertical");

  for (let i = 0; i < template.length; i += 1) {
    let count = 0;
    let hintValue = "";
    for (let j = 0; j < template[i].length; j += 1) {
      if (template[i][j] === 1) {
        count += 1;
      } else if (count > 0) {
        hintValue += `${count} `;
        count = 0;
      }
    }
    if (count > 0) {
      hintValue += count;
    }

    const hint = document.createElement("div");
    hint.classList.add("hints");
    hint.textContent = hintValue;
    hintsContainerVertical.append(hint);
  }
  return hintsContainerVertical;
}

// Выбор шаблона
const currentTemplate = templates[1];

// Заполнение ячеек шаблоном
function fillCellsWithTemplate(template) {
  const gridCells = document.querySelectorAll(".cell");
  for (let i = 0; i < template.length; i += 1) {
    for (let j = 0; j < template[i].length; j += 1) {
      if (template[i][j] === 1) {
        gridCells[i * 5 + j].classList.add("hidden");
      }
    }
  }
}

// Генерация игрового поля
function generatePlayingArea(rows, cols) {
  const playingArea = document.createElement("div");
  playingArea.classList.add("playing-area");

  for (let i = 0; i < rows; i += 1) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < cols; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.append(cell);
    }
    playingArea.append(row);
  }
  container.append(playingArea);
}

// Состояние ячеек
function toggleCellState(cell) {
  if (!cell.classList.contains("hidden")) {
    cell.classList.toggle("crossed");
  }
  if (cell.classList.contains("hidden")) {
    cell.classList.toggle("guessed");
  }
}

// Клик мышкой
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("cell")) {
    toggleCellState(event.target);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  container.append(generateHintsHorizontal(currentTemplate));
  generatePlayingArea(5, 5);
  container.append(generateHintsVertical(currentTemplate));
  fillCellsWithTemplate(currentTemplate);
});
