/* global document */
// eslint-disable-next-line import/extensions
import templates from "./templates.js";

// Общий контейнер
const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

// Выбор шаблона
const currentTemplate = templates[2];

// Генерация игрового поля c шаблоном
function generatePlayingFieldWithHints(template) {
  const playingField = document.createElement("div");
  playingField.classList.add("playing-area");

  const hintsContainerTop = document.createElement("div");
  hintsContainerTop.classList.add("hints-container-top");

  const hintsContainerLeft = document.createElement("div");
  hintsContainerLeft.classList.add("hints-container-left");

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

    // подсказки сверху
    const hintsTop = document.createElement("div");
    hintsTop.classList.add("hints-top");
    hintsContainerTop.append(hintsTop);

    // верхние подсказки для отображения цифр в столбик
    const hintTop = document.createElement("div");
    hintTop.classList.add("hint-top");

    for (let k = 0; k < hintValue.length; k++) {
      const hintDigit = document.createElement("div");
      hintDigit.textContent = hintValue[k];
      hintTop.appendChild(hintDigit);
    }
    hintsTop.append(hintTop);

    // подсказки слева
    const hintsLeft = document.createElement("div");
    hintsLeft.classList.add("hints-left");
    hintsLeft.textContent = hintValue;
    hintsContainerLeft.append(hintsLeft);
  }
  container.appendChild(hintsContainerTop);
  container.appendChild(playingField);
  container.appendChild(hintsContainerLeft);
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
