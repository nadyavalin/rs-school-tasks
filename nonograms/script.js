/* global document */
// eslint-disable-next-line import/extensions
import templates from "./templates.js";

// Общий контейнер
const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

// Выбор шаблона
const currentTemplate = templates[4];

// Генерация игрового поля c шаблоном
function generatePlayingFieldWithHints(template) {
  const playingField = document.createElement("div");
  playingField.classList.add("playing-area");

  const hintsContainerHorizontal = document.createElement("div");
  hintsContainerHorizontal.classList.add("hints-container-horizontal");

  const hintContainerVertical = document.createElement("div");
  hintContainerVertical.classList.add("hints-container-vertical");

  for (let i = 0; i < template.length; i += 1) {
    let count = 0;
    let hintValue = "";
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < template[i].length; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);

      if (template[i][j] === 1) {
        cell.classList.add("hidden");
        count += 1;
      } else if (count > 0) {
        hintValue += `${count} `;
        count = 0;
      }
    }
    if (count > 0) {
      hintValue += count;
    }

    playingField.appendChild(row);

    const hints = document.createElement("div");
    hints.classList.add("hints");
    hints.textContent = hintValue;
    hintsContainerHorizontal.append(hints);

    const hint = document.createElement("div");
    hint.classList.add("hint");
    hint.textContent = hintValue;
    hintContainerVertical.append(hint);
  }
  container.appendChild(playingField);
  container.appendChild(hintsContainerHorizontal);
  container.appendChild(hintContainerVertical);
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
  generatePlayingFieldWithHints(currentTemplate);
});
