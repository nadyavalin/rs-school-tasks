import templates from "./templates.js";

// Общий контейнер
const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

// Контейнер с подсказками слева
const containerWithLeftHints = document.createElement("div");
containerWithLeftHints.classList.add("container-with-left-hints");
container.append(containerWithLeftHints);

// Выбор шаблона
const currentTemplate = templates[4];

// Генерация игрового поля c шаблоном
function generatePlayingFieldWithHints(template) {
  const playingField = document.createElement("div");
  playingField.classList.add("playing-area");

  const hintsContainerTop = document.createElement("div");
  hintsContainerTop.classList.add("hints-container-top");

  const hintsContainerLeft = document.createElement("div");
  hintsContainerLeft.classList.add("hints-container-left");

  const columnCounter = {}

  for (let i = 0; i < template.length; i += 1) {
    let hintCountLeft = 0;
    let hintValueLeft = "";
    let hintValueTop = "";

    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < template[i].length; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.classList.add("hidden");
      row.append(cell);

      if (template[i][j] === 1) {
        hintCountLeft += 1;
        columnCounter[j] = (columnCounter[j] ?? 0) + 1;

      } else if (hintCountLeft > 0) {
        hintValueLeft += `${hintCountLeft} `;
        hintCountLeft = 0;

      } else if (columnCounter[j] > 0) {
        hintValueTop += `${columnCounter[j]} `;
        columnCounter[j] = 0;
      }
    }
    if (hintCountLeft > 0) {
      hintValueLeft += hintCountLeft;
    }
    playingField.append(row);

    // подсказки сверху
    const hintsTop = document.createElement("div");
    hintsTop.classList.add("hints-top");
    hintsContainerTop.append(hintsTop);

    // верхние подсказки для отображения цифр в столбик
    const hintTop = document.createElement("div");
    hintTop.classList.add("hint-top");

    for (let k = 0; k < hintValueTop.length; k += 1) {
      const hintDigit = document.createElement("div");
      hintDigit.textContent = hintValueTop[k];
      hintTop.append(hintDigit);
    }
    hintsTop.append(hintTop);

    // Подсказки слева
    const hintsLeft = document.createElement("div");
    hintsLeft.classList.add("hints-left");
    hintsLeft.textContent = hintValueLeft;
    hintsContainerLeft.append(hintsLeft);
  }
  container.append(hintsContainerTop, containerWithLeftHints);
  containerWithLeftHints.append(playingField, hintsContainerLeft);
  console.log(columnCounter);
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
