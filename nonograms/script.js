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
function createButton(classNames, text) {
  const button = document.createElement("button");
  button.classList.add(...classNames);
  button.textContent = text;
  return button;
}

const chooseGameArea = createDiv(["choose-game-area"]);
document.body.append(chooseGameArea);

const timer = createDiv(["timer"], "00:00");
document.body.append(timer);

let time = 0;

function getTimerByTime(timeResult) {
  const minutes = Math.floor(timeResult / 60);
  const seconds = timeResult % 60;

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

  return `${minutesStr}:${secondsStr}`;
}

let interval;
function startTimer() {
  if (!interval) {
    interval = setInterval(() => {
      time += 1;
      timer.textContent = getTimerByTime(time);
    }, 1000);
  }
}

// Модальное окно завершения игры
const modal = createDiv(["modal"]);
const modalContent = createDiv(["modal__content"]);
const closeButton = createButton(["button"], "Close");

document.body.append(modal);
modal.append(modalContent);

function stopTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;

    // TODO этому коду здесь не место, но за пределами функции в time 0
    const p = document.createElement("p");
    p.textContent = `Great! You have solved the nonogram in ${time} seconds!`;
    modalContent.innerHTML = "";
    modalContent.append(p, closeButton);
  }
}

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
  { name: "Oblique Spiral", template: templates[10], size: 10 },
  { name: "Fir-tree", template: templates[11], size: 10 },
  { name: "Umbrella", template: templates[12], size: 10 },
  { name: "Big house", template: templates[13], size: 15 },
  { name: "Clover", template: templates[14], size: 15 },
  { name: "Castle", template: templates[15], size: 15 },
  { name: "Deer", template: templates[16], size: 15 },
  { name: "Skittles", template: templates[16], size: 15 },
];

const sizeSelectWrap = createDiv(["wrapper__size-select"]);
const labelSize = createLabel(
  "size-select",
  ["label__size-select"],
  "Choose a size:"
);
const sizeSelect = createSelect("size", ["size-select"], "size-select");

const pictureSelectWrap = createDiv(["wrapper__picture-select"]);
const labelPicture = createLabel(
  "picture-select",
  ["label__picture-select"],
  "Choose a picture:"
);
const pictureSelect = createSelect(
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

function fillPictureSelect(size) {
  pictureSelect.innerHTML = "";
  currentTemplates
    .filter((item) => item.size === size)
    .forEach((item) => {
      createOption(item.name, item.name, pictureSelect);
    });
  pictureSelect.dispatchEvent(new Event("change"));
}

[5, 10, 15].forEach((size) => {
  createOption(size, `${size} x ${size}`, sizeSelect);
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

sizeSelect.addEventListener("change", () => {
  const selectedSize = parseInt(sizeSelect.value, 10);
  fillPictureSelect(selectedSize);
  stopTimer();
});

let selectedPictureTemplate;

pictureSelect.addEventListener("change", () => {
  selectedPictureTemplate = currentTemplates.find(
    (item) => item.name === pictureSelect.value
  );

  gameArea.textContent = "";

  if (selectedPictureTemplate) {
    generatePlayingFieldWithHints(selectedPictureTemplate.template);
  }

  gameUserArray = selectedPictureTemplate.template.map((row) =>
    row.map(() => 0)
  );
  stopTimer();
});

let gameResults = getItemFromLocalStorage("gameResults") || [];
function saveGameToLocalStorage() {
  gameResults.push({
    time,
    gameName: selectedPictureTemplate.name,
    difficulty: selectedPictureTemplate.size,
  });
  gameResults.sort((a, b) => a.time - b.time);
  gameResults = gameResults.slice(-MAX_RESULTS);
  setItemToLocalStorage("gameResults", gameResults);
}

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
// const winAudio = createAudio("./audio/mne-etot-mir-ponyaten.mp3");
const winAudio = createAudio("./audio/win-song.mp3");

// окончание игры
function gameOver() {
  modal.classList.add("visible");
  winAudio.play();
  stopTimer();
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
    if (compareArrays(selectedPictureTemplate.template, gameUserArray)) {
      gameOver();
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

// общий контейнер для кнопок
const buttonContainer = createDiv(["button-container"]);
document.body.append(buttonContainer);

// Сброс текущей игры
function clearGameArea() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("blacked");
    cell.classList.remove("crossed");
  });
  time = 0;
  interval = null;
  gameUserArray = gameUserArray.map((row) => row.map(() => 0));
}

closeButton.addEventListener("click", () => {
  modal.classList.remove("visible");
  timer.textContent = "00:00";
  winAudio.pause();
  winAudio.currentTime = 0;
  saveGameToLocalStorage();
  clearGameArea();
});

// Кнопка сброса текущей игры
const resetButton = createButton(["button"], "Reset game");
buttonContainer.append(resetButton);

resetButton.addEventListener("click", () => {
  stopTimer();
  timer.textContent = "00:00";
  clearGameArea();
});

// Кнопка выбора рандомной игры
const randomButtom = createButton(["button"], "Random game");
buttonContainer.append(randomButtom);

randomButtom.addEventListener("click", () => {
  clearGameArea();
  const randomIndex = Math.floor(Math.random() * currentTemplates.length);
  const selectedTemplate = currentTemplates[randomIndex];
  sizeSelect.value = selectedTemplate.size;
  sizeSelect.dispatchEvent(new Event("change"));
  pictureSelect.value = selectedTemplate.name;
  pictureSelect.dispatchEvent(new Event("change"));
});

// кнопка сохранения игры - сохраняется промежуточный результат
const saveButton = createButton(["button"], "Save game");
buttonContainer.append(saveButton);

function saveCurrentTemplateToLocalStorage() {
  if (selectedPictureTemplate) {
    const currentTemplateState = {
      template: selectedPictureTemplate,
      gameUserArray,
    };
    setItemToLocalStorage("currentTemplateState", currentTemplateState);
  }
}

saveButton.addEventListener("click", () => {
  saveCurrentTemplateToLocalStorage();
});

// TODO доработать функционал - пока появляется только нужный шаблон, но он пуст
// кнопка продолжить игру
const continueButton = createButton(["button"], "Continue last game");
buttonContainer.append(continueButton);

continueButton.addEventListener("click", () => {
  const savedTemplate = getItemFromLocalStorage("currentTemplateState");
  if (savedTemplate) {
    selectedPictureTemplate = savedTemplate.template;
    pictureSelect.value = selectedPictureTemplate.name;
    gameArea.textContent = "";
    generatePlayingFieldWithHints(selectedPictureTemplate.template);
    selectedPictureTemplate = gameUserArray;
    stopTimer();
  } else {
    alert("You haven't any saved templates yet");
  }
});

// кнопка для отображения модалки - 5 последних результатов игры
const lastResultsButton = createButton(["button"], "Scores");
buttonContainer.append(lastResultsButton);

// модальное окно для вывода 5 последних результатов игры
const modalResults = createDiv(["modal-result"]);
const modalResultsContent = createDiv(["modal-result__content"]);
const closeResultsButton = createButton(["button"], "Close");

document.body.append(modalResults);
modalResults.append(modalResultsContent);

closeResultsButton.addEventListener("click", () => {
  modalResults.classList.remove("visible");
  modalResultsContent.innerHTML = "";
});

const lastResultsText = document.createElement("p");
lastResultsText.textContent = `Your last best scores:`;

function displayBestScores() {
  const bestScores = getItemFromLocalStorage("gameResults") || [];

  bestScores.forEach((result, index) => {
    const timeFormatted = getTimerByTime(result.time);
    const scoreText = document.createElement("p");
    scoreText.textContent = `${index + 1}. Game: ${result.gameName} ||
    Difficulty: ${result.difficulty} ||
    Time: ${timeFormatted}`;
    modalResultsContent.append(scoreText, closeResultsButton);
  });
}

lastResultsButton.addEventListener("click", () => {
  modalResults.classList.add("visible");
  modalResultsContent.innerHTML = "";
  modalResultsContent.append(lastResultsText);
  displayBestScores();
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

// кнопка Показать решение
const solutionButton = createButton(["button"], "Solution");
buttonContainer.append(solutionButton);

solutionButton.addEventListener("click", () => {
  if (selectedPictureTemplate) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
      const { template } = selectedPictureTemplate;
      const row = Math.floor(index / template[0].length);
      const col = index % template[0].length;

      if (template[row][col] === 1) {
        cell.classList.add("blacked");
      }
    });
  }

  // TODO таймер не должен запускаться после нажатия кнопки Solution и после еще одного клика по полю
  if (compareArrays(selectedPictureTemplate.template, gameUserArray)) {
    gameOver();
  }
});

// Кнопка смены темы
const changeThemebutton = createButton(["button"], "Change theme");
buttonContainer.append(changeThemebutton);

changeThemebutton.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    switchToDarkMode();
  } else {
    switchToLightMode();
  }
});

chooseGameArea.append(sizeSelectWrap, pictureSelectWrap);
sizeSelectWrap.append(labelSize, sizeSelect);
pictureSelectWrap.append(labelPicture, pictureSelect);

document.addEventListener("DOMContentLoaded", () => {
  fillPictureSelect(5);
});
