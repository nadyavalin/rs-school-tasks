import templates from "./templates.js";

const MAX_RESULTS = 5;

document.body.classList.add("light");

// Local Storage
function setItemToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// функция создания элементов div
function createDiv(classNames, text) {
  const div = document.createElement("div");
  div.classList.add(...classNames);
  div.textContent = text;
  return div;
}

// функция создания элементов label
function createLabel(htmlFor, classNames, text) {
  const label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.classList.add(...classNames);
  label.textContent = text;
  return label;
}

// функция создания элементов select
function createSelect(name, classNames, id) {
  const select = document.createElement("select");
  select.name = name;
  select.classList.add(...classNames);
  select.id = id;
  return select;
}

// функция создания элементов button
function createButton(type, classNames, text) {
  const button = document.createElement("button");
  button.setAttribute("data-type", type);
  button.classList.add(...classNames);
  button.textContent = text;
  return button;
}

const chooseGameArea = createDiv(["choose-game-area"]);
document.body.append(chooseGameArea);

const timer = createDiv(["timer"], "00:00");
document.body.append(timer);

let interval;
let time = 0;
let isTimerRunning = false;
let savedTime = 0;

if (localStorage.getItem("savedTime")) {
  savedTime = parseInt(localStorage.getItem("savedTime"), 10);
  time = savedTime;
}

// сохранениt значения в localStorage
function saveTimerValue() {
  localStorage.setItem("timerValue", timer.textContent);
  localStorage.setItem("savedTime", time);
}

// загрузка значения из localStorage
function loadTimerValue() {
  const savedValue = localStorage.getItem("timerValue");
  if (savedValue) {
    timer.textContent = savedValue;
  }
}

function updateTimer() {
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
  saveTimerValue();
}

function startTimer() {
  interval = setInterval(updateTimer, 1000);
  isTimerRunning = true;
}

function stopTimer() {
  if (isTimerRunning) {
    clearInterval(interval);
    const p = document.createElement("p");
    p.textContent = `Great! You have solved the nonogram in ${time} seconds!`;
    interval = null;
    modalContent.innerHTML = "";
    modalContent.append(p, closeButton);
    isTimerRunning = false;
  }
  saveTimerValue();
}

loadTimerValue();

function resetTimer() {
  time = 0;
  timer.textContent = "00:00";
  localStorage.removeItem("savedTime");
}

resetTimer();

// Получить сохраненные секунды из localStorage
let timeResults = getItemFromLocalStorage("time") || [];

function getSeconds() {
  const secondItems = time;
  return secondItems;
}

function saveSeconds() {
  const seconds = getSeconds();
  timeResults.push(seconds);
  if (timeResults.length > MAX_RESULTS) {
    timeResults.shift();
  }
  timeResults.sort((a, b) => a - b);
  setItemToLocalStorage("time", timeResults);
}
timeResults = timeResults.slice(-MAX_RESULTS);

// Модальное окно
const modal = createDiv(["modal"]);
const modalContent = createDiv(["modal__content"]);
const closeButton = createButton("close", ["button"], "Close");

document.body.append(modal);
modal.append(modalContent);

const gameArea = createDiv(["game-area"]);
document.body.append(gameArea);

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

const sizeSelectWrap = createDiv(["wrapper__size-select"]);
const labelSize = createLabel(
  "size-select",
  ["label__size-select"],
  "Choose a size:"
);
const selectSize = createSelect("size", ["size-select"], "size-select");

const pictureSelectWrap = createDiv(["wrapper__picture-select"]);
const labelPicture = createLabel(
  "picture-select",
  ["label__picture-select"],
  "Choose a picture:"
);
const selectPicture = createSelect(
  "picture",
  ["picture-select"],
  "picture-select"
);

// создание элемента option
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
  const playingField = createDiv(["playing-area"]);
  const hintsContainerTop = createDiv(["game-area__top-hints"]);
  const hintsContainerLeft = createDiv(["game-area__left-hints"]);

  const columnCounter = {};
  const topHintsArray = [];

  const rowCounter = {};
  const leftHintsArray = [];

  for (let i = 0; i < template.length; i += 1) {
    const leftHints = createDiv(["left-hints"]);
    leftHintsArray.push(leftHints);
    hintsContainerLeft.append(leftHints);

    const row = createDiv(["row"]);

    for (let j = 0; j < template[i].length; j += 1) {
      const cell = createDiv(["cell"]);
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
        const topHints = createDiv(["top-hints"]);
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

// создание элемента audio
function createAudio(src) {
  const audio = document.createElement("audio");
  audio.src = src;
  document.body.append(audio);
  return audio;
}

// звук для закрашивания ячейки черным
const blackCellAudio = createAudio("./audio/black-cell.mp3");

// звук для отметки ячейки крестом
const crossCellAudio = createAudio("./audio/cross-cell.mp3");

// звук для обнуления цвета ячейки
const whiteCellAudio = createAudio("./audio/white-cell.wav");

// звук победы
const winAudio = createAudio("./audio/mne-etot-mir-ponyaten.mp3");

// окончание игры
function gameOver() {
  modal.classList.add("visible");
  winAudio.play();
}

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
      gameOver();
      stopTimer();
    }
  }
});

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
  time = 0;
  interval = null;
  isTimerRunning = false;
  gameUserArray = gameUserArray.map((row) => row.map(() => 0));
}

closeButton.addEventListener("click", () => {
  modal.classList.remove("visible");
  timer.textContent = "00:00";
  winAudio.pause();
  winAudio.currentTime = 0;
  saveSeconds(); // сохранение секунд в localStorage
  clearGameArea();
});

// Кнопка сброса текущей игры
const resetButton = createButton("reset", ["button"], "Reset game");
document.body.append(resetButton);

resetButton.addEventListener("click", () => {
  stopTimer();
  timer.textContent = "00:00";
  clearGameArea();
});

// Кнопка выбора рандомной игры
const randomButtom = createButton("random", ["button"], "Random game");
document.body.append(randomButtom);

// TODO добавить функционал для случайного выбора игры
// randomButtom.addEventListener("click", () => {
//   const randomGame = Math.round(Math.random());
// });

// TODO добавить функционал
// Кнопка сохранения игры
const saveButton = createButton("save", ["button"], "Save game");
document.body.append(saveButton);

// TODO добавить функционал
// Кнопка для отображения модалки - 5 последних результатов
const lastResultsButton = createButton("last", ["button"], "Best scores");
document.body.append(lastResultsButton);

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
const changeThemebutton = createButton("change", ["button"], "Change theme");
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
