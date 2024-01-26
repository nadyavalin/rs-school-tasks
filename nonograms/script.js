import templates from "./templates.js";

// Общий контейнер
const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

const currentTemplate = [
  { name: "Игра 1", template: templates[0], size: 5 },
  { name: "Игра 2", template: templates[1], size: 5 },
  { name: "Игра 3", template: templates[2], size: 5 },
  { name: "Игра 4", template: templates[3], size: 5 },
  { name: "Игра 5", template: templates[4], size: 5 },
  { name: "Игра 6", template: templates[5], size: 10 },
  { name: "Игра 7", template: templates[6], size: 10 },
  { name: "Игра 8", template: templates[7], size: 10 },
  { name: "Игра 9", template: templates[8], size: 10 },
  { name: "Игра 10", template: templates[9], size: 10 },
];

// Поле с выбором игры
function createHintElement(hintsContainer, counter) {
  const hint = document.createElement("div");
  hint.classList.add("hint");
  hint.textContent = counter;
  hintsContainer.append(hint);
}

// Генерация игрового поля c шаблоном с подсказками в одной ячейке
function generatePlayingFieldWithHints(template) {
  const playingField = document.createElement("div");
  playingField.classList.add("playing-area");

  const hintsContainerTop = document.createElement("div");
  hintsContainerTop.classList.add("container__top-hints");

  const hintsContainerLeft = document.createElement("div");
  hintsContainerLeft.classList.add("container__left-hints");

  const columnCounter = {};
  const topHintsArray = [];

  const rowCounter = {};
  const leftHintsArray = [];

  for (let i = 0; i < template.length; i += 1) {
    const leftHints = document.createElement("div");
    leftHints.classList.add("left-hints");
    leftHintsArray.push(leftHints);
    hintsContainerLeft.append(leftHints);

    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < template[i].length; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.append(cell);

      if (template[i][j] === 1) {
        rowCounter[i] = (rowCounter[i] ?? 0) + 1;
        columnCounter[j] = (columnCounter[j] ?? 0) + 1;
        if (template.length - 1 === i) {
          createHintElement(topHintsArray[j], columnCounter[j]);
        }
        if (template[i].length - 1 === j) {
          createHintElement(leftHintsArray[i], rowCounter[i]);
        }
      } else {
        if (columnCounter[j] > 0) {
          createHintElement(topHintsArray[j], columnCounter[j]);
          columnCounter[j] = 0;
        }
        if (rowCounter[i] > 0) {
          createHintElement(leftHintsArray[i], rowCounter[i]);
          rowCounter[i] = 0;
        }
      }
      if (i === 0) {
        const topHints = document.createElement("div");
        topHints.classList.add("top-hints");
        topHintsArray.push(topHints);
        hintsContainerTop.append(topHints);
      }
      playingField.append(row);
    }
  }
  container.append(hintsContainerTop, hintsContainerLeft, playingField);
}

// Изменение цвета ячейки на черный
container.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");
  if (cell) {
    cell.classList.toggle("blacked");
    cell.classList.remove("crossed");
  }
});

// Изменение содержимого ячейки на крест
container.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const cell = event.target.closest(".cell");
  if (cell) {
    cell.classList.toggle("crossed");
    cell.classList.remove("blacked");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  generatePlayingFieldWithHints(currentTemplate);
});
