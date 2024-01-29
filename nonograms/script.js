import templates from "./templates.js";

// Зона выбора игры
const chooseGameArea = document.createElement("div");
chooseGameArea.classList.add("choose-game-area");
document.body.append(chooseGameArea);

// Таймер
const timer = document.createElement("div");
timer.classList.add(".timer");
timer.innerHTML = "00:00";
document.body.append(timer);

let time = 0;
let interval;

function startTimer() {
  console.log("Timer started!");
  interval = setInterval(() => {
    time += 1;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    let minutesStr = "";
    if (minutes < 10) {
      minutesStr = `0${  minutes}`;
    } else {
      minutesStr = minutes.toString();
    }

    let secondsStr = "";
    if (seconds < 10) {
      secondsStr = `0${  seconds}`;
    } else {
      secondsStr = seconds.toString();
    }

    timer.innerHTML = `${minutesStr}:${secondsStr}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

// Зона игры
const gameArea = document.createElement("div");
gameArea.classList.add("game-area");
document.body.append(gameArea);

// Выбор игры
const currentTemplate = [
  { name: "Cross", template: templates[0], size: 5 },
  { name: "Oblique cross", template: templates[1], size: 5 },
  { name: "Chess", template: templates[2], size: 5 },
  { name: "Rhombus", template: templates[3], size: 5 },
  { name: "Black hole", template: templates[4], size: 5 },
  { name: "Angle", template: templates[5], size: 5 },
  { name: "Road", template: templates[6], size: 5 },
  { name: "Packet", template: templates[7], size: 10 },
  { name: "House", template: templates[8], size: 10 },
  { name: "Spiral", template: templates[9], size: 10 },
  { name: "Oblique Siral", template: templates[10], size: 10 },
  { name: "Fir-tree", template: templates[11], size: 10 },
  { name: "Umbrella", template: templates[12], size: 10 },
];

const sizeSelectWrap = document.createElement("div");
sizeSelectWrap.classList = "wrapper__size-select";

const labelSize = document.createElement("label");
labelSize.htmlFor = "size-select";
labelSize.classList = "label__size-select";
labelSize.innerHTML = "Choose a size:";

const selectSize = document.createElement("select");
selectSize.name = "size";
selectSize.classList = "size-select";
selectSize.id = "size-select";

const pictureSelectWrap = document.createElement("div");
pictureSelectWrap.classList = "wrapper__picture-select";

const labelPicture = document.createElement("label");
labelPicture.htmlFor = "picture-select";
labelPicture.classList = "label__picture-select";
labelPicture.textContent = "Choose a picture:";

const selectPicture = document.createElement("select");
selectPicture.name = "picture";
selectPicture.classList = "picture-select";
selectPicture.id = "picture-select";

function createOption(value, text, select) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  select.append(option);
}

currentTemplate
  .filter((item) => item.size === 5)
  .forEach((item) => {
    createOption(item.name, item.name, selectPicture);
  });

[5, 10].forEach((size) => {
  createOption(size, `${size} x ${size}`, selectSize);
});

// Создание ячеек с подсказками
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
  hintsContainerTop.classList.add("game-area__top-hints");

  const hintsContainerLeft = document.createElement("div");
  hintsContainerLeft.classList.add("game-area__left-hints");

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
  gameArea.append(hintsContainerTop, hintsContainerLeft, playingField);
}

// Проверка победы
let gameUserArray;

function compareArrays(firstArray, secondArray) {
  for (let i = 0; i < firstArray; i += 1) {
    if (firstArray[i] !== secondArray[i]) {
      return false;
    }

    for (let j = 0; j < firstArray[i]; j += 1) {
      if (firstArray[i][j] !== secondArray[i][j]) {
        return false;
      }
    }
  }
  return true;
}

// Листенер смены размера
selectSize.addEventListener("change", () => {
  const selectedSize = parseInt(selectSize.value, 10);

  selectPicture.textContent = "";
  gameArea.innerHTML = "";

  currentTemplate
    .filter((item) => item.size === selectedSize)
    .forEach((item) => {
      createOption(item.name, item.name, selectPicture);
    });

  selectPicture.dispatchEvent(new Event("change"));
});

// Листенер смены картинки
selectPicture.addEventListener("change", () => {
  const selectedPictureTemplate = currentTemplate.find(
    (item) => item.name === selectPicture.value
  );

  gameArea.innerHTML = "";

  if (selectedPictureTemplate) {
    generatePlayingFieldWithHints(selectedPictureTemplate.template);
  }

  /* вариант получения двумерного массива, заполненного нулями
  gameUserArray = [];
  for (let i = 0; i < selectedPictureTemplate.size; i += 1) {
    const row = [];
    for (let j = 0; j < selectedPictureTemplate.size; j += 1) {
      row.push(0);
    }
    gameUserArray.push(row);
  } */

  gameUserArray = new Array(selectedPictureTemplate.size)
    .fill(0)
    .map(() => new Array(selectedPictureTemplate.size).fill(0));
});

// Изменение цвета ячейки на черный
let isFirstClick = true;

gameArea.addEventListener("click", (event) => {
  if (isFirstClick) {
    startTimer();
    isFirstClick = false;
  }

  const cell = event.target.closest(".cell");
  if (cell) {
    cell.classList.toggle("blacked");
    cell.classList.remove("crossed");
  }

  if (compareArrays(currentTemplate, gameUserArray)) {
    stopTimer();
    console.log("Win!");
  }
});

// Изменение содержимого ячейки на крест
gameArea.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const cell = event.target.closest(".cell");
  if (cell) {
    cell.classList.toggle("crossed");
    cell.classList.remove("blacked");
  }
});

// Сброс текущей игры
function clearGameArea() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("blacked");
    cell.classList.remove("crossed");
  });
}

const resetButton = document.createElement("button");
resetButton.textContent = "Reset a game";
resetButton.addEventListener("click", clearGameArea);
document.body.append(resetButton);

chooseGameArea.append(sizeSelectWrap, pictureSelectWrap);
sizeSelectWrap.append(labelSize, selectSize);
pictureSelectWrap.append(labelPicture, selectPicture);

document.addEventListener("DOMContentLoaded", () => {
  generatePlayingFieldWithHints(templates[0]);
});
