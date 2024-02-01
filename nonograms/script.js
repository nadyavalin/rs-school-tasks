import templates from "./templates.js";

document.body.classList.add("light");

const chooseGameArea = document.createElement("div");
chooseGameArea.classList.add("choose-game-area");
document.body.append(chooseGameArea);

const timer = document.createElement("div");
timer.classList.add("timer");
timer.textContent = "00:00";
document.body.append(timer);

let interval;
let time = 0;
let isTimerRunning = false;

function startTimer() {
  interval = setInterval(() => {
    time += 1;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    let minutesStr = "";
    if (minutes < 10) {
      minutesStr = `0${minutes}`;
    } else {
      minutesStr = minutes.toString();
    }

    let secondsStr = "";
    if (seconds < 10) {
      secondsStr = `0${seconds}`;
    } else {
      secondsStr = seconds.toString();
    }

    timer.textContent = `${minutesStr}:${secondsStr}`;
  }, 1000);
  isTimerRunning = true;
}

// Модальное окно
const modal = document.createElement("div");
modal.classList.add("modal");
document.body.append(modal);

const modalContent = document.createElement("div");
modalContent.classList.add("modal__content");
modal.append(modalContent);

const buttonClose = document.createElement("button");
buttonClose.classList.add("button");
buttonClose.textContent = "Close!";

const gameArea = document.createElement("div");
gameArea.classList.add("game-area");
document.body.append(gameArea);

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(interval);
    const p = document.createElement("p");
    p.textContent = `Great! You have solved the nonogram in ${time} seconds!`;
    interval = null;
    modalContent.append(p, buttonClose);
    isTimerRunning = false;
  }
}

const currentTemplates = [
  { name: "Cross", template: templates[0], size: 5 },
  { name: "Ladder", template: templates[1], size: 5 },
  { name: "Chess", template: templates[2], size: 5 },
  { name: "Letter M", template: templates[3], size: 5 },
  { name: "Black hole", template: templates[4], size: 5 },
  { name: "Angle", template: templates[5], size: 5 },
  { name: "Road", template: templates[6], size: 5 },
  { name: "Packet", template: templates[7], size: 10 },
  { name: "House", template: templates[8], size: 10 },
  { name: "Spiral", template: templates[9], size: 10 },
  { name: "Oblique Siral", template: templates[10], size: 10 },
  { name: "Fir-tree", template: templates[11], size: 10 },
  { name: "Umbrella", template: templates[12], size: 10 },
  { name: "Cherry", template: templates[13], size: 15 },
  { name: "Big house", template: templates[14], size: 15 },
  { name: "Clover", template: templates[15], size: 15 },
  { name: "Castle", template: templates[16], size: 15 },
  { name: "Deer", template: templates[17], size: 15 },
];

const sizeSelectWrap = document.createElement("div");
sizeSelectWrap.classList.add("wrapper__size-select");

const labelSize = document.createElement("label");
labelSize.htmlFor = "size-select";
labelSize.classList.add("label__size-select");
labelSize.textContent = "Choose a size:";

const selectSize = document.createElement("select");
selectSize.name = "size";
selectSize.classList.add("size-select");
selectSize.id = "size-select";

const pictureSelectWrap = document.createElement("div");
pictureSelectWrap.classList.add("wrapper__picture-select");

const labelPicture = document.createElement("label");
labelPicture.htmlFor = "picture-select";
labelPicture.classList.add("label__picture-select");
labelPicture.textContent = "Choose a picture:";

const selectPicture = document.createElement("select");
selectPicture.name = "picture";
selectPicture.classList.add("picture-select");
selectPicture.id = "picture-select";

function createOption(value, text, select) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  select.append(option);
}

function filterTemplate(size) {
  selectPicture.innerHTML = "";
  currentTemplates
    .filter((item) => item.size === size)
    .forEach((item) => {
      createOption(item.name, item.name, selectPicture);
    });
  selectPicture.dispatchEvent(new Event("change"));
}

[5, 10, 15].forEach((size) => {
  createOption(size, `${size} x ${size}`, selectSize);
});

function createHintElement(hintsContainer, counter) {
  const hint = document.createElement("div");
  hint.classList.add("hint");
  hint.textContent = counter;
  hintsContainer.append(hint);
}

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
      cell.setAttribute("data-row", i);
      cell.setAttribute("data-col", j);
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
  for (let i = 0; i < firstArray.length; i += 1) {
    for (let j = 0; j < firstArray[i].length; j += 1) {
      if (firstArray[i][j] !== secondArray[i][j]) {
        return false;
      }
    }
  }
  return true;
}

selectSize.addEventListener("change", () => {
  const selectedSize = parseInt(selectSize.value, 10);
  filterTemplate(selectedSize);
  stopTimer();
});

let selectedPictureTemplate;

selectPicture.addEventListener("change", () => {
  selectedPictureTemplate = currentTemplates.find(
    (item) => item.name === selectPicture.value
  ).template;

  gameArea.textContent = "";

  if (selectedPictureTemplate) {
    generatePlayingFieldWithHints(selectedPictureTemplate);
  }

  gameUserArray = selectedPictureTemplate.map((row) => row.map(() => 0));
  stopTimer();
});

function gameOver() {
  modal.classList.add("visible");
}

buttonClose.addEventListener("click", () => {
  modal.classList.remove("visible");
  timer.textContent = "00:00";
});

// звук для закрашивания ячейки черным
const blackCellAudio = document.createElement("audio");
blackCellAudio.src = "./audio/black-cell.mp3";
document.body.append(blackCellAudio);

// звук для обнуления цвета ячейки
const whiteCellAudio = document.createElement("audio");
whiteCellAudio.src = "./audio/white-cell.wav";
document.body.append(whiteCellAudio);

// Изменение цвета ячейки на черный
gameArea.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");

  if (cell) {
    const { row, col } = cell.dataset;
    if (!interval) {
      startTimer();
    }

    if (cell.classList.contains("blacked")) {
      cell.classList.remove("blacked");
      cell.classList.remove("crossed");
      gameUserArray[row][col] = 0;
      whiteCellAudio.play();
    } else {
      cell.classList.add("blacked");
      cell.classList.remove("crossed");
      gameUserArray[row][col] = 1;
      blackCellAudio.play();
    }
    if (compareArrays(selectedPictureTemplate, gameUserArray)) {
      stopTimer();
      gameOver();
    }
  }
});

// звук для отметки ячейки крестом
const crossCellAudio = document.createElement("audio");
crossCellAudio.src = "./audio/cross-cell.mp3";
document.body.append(crossCellAudio);

// Изменение содержимого ячейки на крест
gameArea.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const cell = event.target.closest(".cell");
  if (cell) {
    if (!interval) {
      startTimer();
    }

    const { row, col } = cell.dataset;
    gameUserArray[row][col] = 0;
    if (cell.classList.contains("crossed")) {
      cell.classList.remove("crossed");
      cell.classList.remove("blacked");
      whiteCellAudio.play();
    } else {
      cell.classList.add("crossed");
      cell.classList.remove("blacked");
      crossCellAudio.play();
    }
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

// Кнопка сброса текущей игры
const resetButton = document.createElement("button");
resetButton.classList.add("button");
resetButton.textContent = "Reset a game";
document.body.append(resetButton);

resetButton.addEventListener("click", () => {
  clearGameArea();
  stopTimer();
});

// Смена темы
function switchToLightMode() {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
}

function switchToDarkMode() {
  document.body.classList.remove("light");
  document.body.classList.add("dark");
}

// Кнопка смены темы
const changeThemebutton = document.createElement("button");
changeThemebutton.classList.add("button");
changeThemebutton.textContent = "Change theme";
document.body.append(changeThemebutton);

changeThemebutton.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    switchToDarkMode();
  } else {
    switchToLightMode();
  }
});

chooseGameArea.append(sizeSelectWrap, pictureSelectWrap);
sizeSelectWrap.append(labelSize, selectSize);
pictureSelectWrap.append(labelPicture, selectPicture);

document.addEventListener("DOMContentLoaded", () => {
  filterTemplate(5);
});
