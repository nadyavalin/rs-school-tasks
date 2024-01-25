import templates from "./templates.js";

// Общий контейнер
const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

// Выбор шаблона
const currentTemplate = templates[4];

// Генерация игрового поля c шаблоном с подсказками в одной ячейке
function generatePlayingFieldWithHints(template) {
  const playingField = document.createElement("div");
  playingField.classList.add("playing-area");

  const hintsContainerTop = document.createElement("div");
  hintsContainerTop.classList.add("container__top-hints");

  const hintsContainerLeft = document.createElement("div");
  hintsContainerLeft.classList.add("container__left-hints");

  const columnCounter = {};
  const hintsArray = [];

  for (let i = 0; i < template.length; i += 1) {
    const leftHints = document.createElement("div");
    leftHints.classList.add("left-hints");

    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < template[i].length; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.append(cell);

      if (template[i][j] === 1) {
        columnCounter[j] = (columnCounter[j] ?? 0) + 1;
        if (template.length - 1 === i) {
          const hint = document.createElement("div");
          hint.classList.add("hint");
          hint.textContent = columnCounter[j];
          hintsArray[j].append(hint);
        }
      } else if (columnCounter[j] > 0) {
        const hint = document.createElement("div");
        hint.classList.add("hint");
        hint.textContent = columnCounter[j];
        hintsArray[j].append(hint);
        columnCounter[j] = 0;
      }
      if (i === 0) {
        const topHints = document.createElement("div");
        topHints.classList.add("top-hints");
        hintsArray.push(topHints);
        hintsContainerTop.append(topHints);
      }
    }
    hintsContainerLeft.append(leftHints);
    playingField.append(row);
  }
  container.append(hintsContainerTop, hintsContainerLeft, playingField);
  console.log(hintsArray);
  console.log(columnCounter);
}

// Изменение цвета ячейки на черный
container.addEventListener("click", (event) => {
  const cell = event.target.closest('.cell');
  if (cell) {
    cell.classList.toggle("blacked");
    cell.classList.remove("crossed");
  }
});

// Изменение содержимого ячейки на крест
container.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const cell = event.target.closest('.cell');
  if (cell) {
    cell.classList.toggle("crossed");
    cell.classList.remove("blacked");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  generatePlayingFieldWithHints(currentTemplate);
});
