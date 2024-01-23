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
const currentTemplate = templates[6];

// Генерация игрового поля c шаблоном
function generatePlayingFieldWithHints(template) {
  const playingField = document.createElement("div");
  playingField.classList.add("playing-area");

  const hintsContainerTop = document.createElement("div");
  hintsContainerTop.classList.add("hints-container-top");

  const hintsContainerLeft = document.createElement("div");
  hintsContainerLeft.classList.add("hints-container-left");

  for (let i = 0; i < template.length; i += 1) {
    let countLeft = 0;
    let countTop = 0;
    let hintValueLeft = "";
    let hintValueTop = "";

    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < template[i].length; j += 1) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.append(cell);
      cell.classList.add("hidden");

      if (template[i][j] === 1) {
        countLeft += 1;
      } else if (countLeft > 0) {
        hintValueLeft += `${countLeft} `;
        countLeft = 0;
      }
    }
    if (countLeft > 0) {
      hintValueLeft += countLeft;
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

      // TODO попытка сделать правильными подсказки сверху
      if (template[k] === 1) {
        countTop += 1;
      } else if (countTop > 0) {
        hintValueTop += `${countTop} `;
        countTop = 0;
      }
    }
    if (countTop > 0) {
      hintValueTop += countTop;
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
