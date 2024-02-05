import currentTemplates from "./js/currentTemplatesArray.js";
import toggleSound from "./js/toggleSoundfunction.js";
import { createDiv, createOption } from "./js/createElements.js";

import {
  blackCellAudio,
  crossCellAudio,
  whiteCellAudio,
  winAudio,
} from "./js/sounds.js";

import {
  setItemToLocalStorage,
  getItemFromLocalStorage,
} from "./js/localStorage.js";

import {
  MAX_RESULTS,
  PICTURE_SIZE,
  chooseGameArea,
  gameArea,
  timer,
} from "./js/globalVariables.js";

import {
  resetButton,
  solutionButton,
  saveButton,
  continueButton,
  randomButtom,
  lastResultsButton,
  changeThemebutton,
  soundButton,
} from "./js/buttons.js";

import {
  switchToLightMode,
  switchToDarkMode,
} from "./js/changeThemefunctions.js";

import {
  modal,
  modalContent,
  lastResultsText,
  closeButton,
  modalResults,
  modalResultsContentText,
  closeResultsButton,
} from "./js/modals.js";

import {
  sizeSelectWrap,
  labelSize,
  sizeSelect,
  pictureSelectWrap,
  labelPicture,
  pictureSelect,
} from "./js/selects.js";

document.body.classList.add("light");

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
  if (
    !interval &&
    !compareArrays(selectedPictureTemplate.template, gameUserArray)
  ) {
    interval = setInterval(() => {
      time += 1;
      timer.textContent = getTimerByTime(time);
    }, 1000);
  }
}

function stopTimer() {
  if (interval) {
    clearInterval(interval);
    timer.textContent = "00:00";
    interval = null;
    time = 0;
  }
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

// listener для выбора размера
sizeSelect.addEventListener("change", () => {
  const selectedSize = parseInt(sizeSelect.value, 10);
  fillPictureSelect(selectedSize);
  stopTimer();
});

let selectedPictureTemplate;

// listener для выбора кроссворда
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

// сохранение в localStorage результатов игры
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

// окончание игры
function gameOver() {
  modal.classList.add("visible");
  winAudio.play();
  modalContent.textContent = `Great! You have solved the nonogram in ${time} seconds!`;
  modalContent.append(closeButton);
  saveGameToLocalStorage();
  stopTimer();
}

// изменение цвета ячейки на черный
gameArea.addEventListener("click", (event) => {
  const cell = event.target.closest(".cell");

  if (cell && !compareArrays(selectedPictureTemplate.template, gameUserArray)) {
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

// изменение содержимого ячейки на крест
gameArea.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const cell = event.target.closest(".cell");
  if (cell && !compareArrays(selectedPictureTemplate.template, gameUserArray)) {
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

// сброс текущей игры
function clearGameArea() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.classList.remove("blacked");
    cell.classList.remove("crossed");
  });
  stopTimer();
  gameUserArray = gameUserArray.map((row) => row.map(() => 0));
}

// listener для кнопки, которая закрывает модалку победы
closeButton.addEventListener("click", () => {
  modal.classList.remove("visible");
  winAudio.pause();
  winAudio.currentTime = 0;
  clearGameArea();
});

// listener кнопки сброса текущей игры
resetButton.addEventListener("click", () => {
  clearGameArea();
});

function applyTemplateToCells(template) {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    const row = Math.floor(index / template[0].length);
    const col = index % template[0].length;
    if (template[row][col] === 1) {
      cell.classList.add("blacked");
      gameUserArray[row][col] = 1;
    }
  });
}

// listener кнопки Показать решение
solutionButton.addEventListener("click", () => {
  if (selectedPictureTemplate) {
    clearGameArea();
    const { template } = selectedPictureTemplate;
    applyTemplateToCells(template);
  }
});

// сохранение в localStorage промежуточного результата
function saveCurrentTemplateToLocalStorage() {
  if (selectedPictureTemplate) {
    const savedGame = {
      time,
      template: selectedPictureTemplate,
      gameUserArray,
    };
    setItemToLocalStorage("savedGame", savedGame);
  }
}

// listener для кнопки сохранения игры
saveButton.addEventListener("click", () => {
  saveCurrentTemplateToLocalStorage();
});

// listener для кнопки Продолжить игру
continueButton.addEventListener("click", () => {
  const savedGame = getItemFromLocalStorage("savedGame");
  if (savedGame) {
    time = savedGame.time;
    timer.textContent = getTimerByTime(time);
    sizeSelect.value = savedGame.template.size;
    sizeSelect.dispatchEvent(new Event("change"));
    pictureSelect.value = savedGame.template.name;
    pictureSelect.dispatchEvent(new Event("change"));
    applyTemplateToCells(savedGame.gameUserArray);
    console.log(savedGame.gameUserArray);
  } else {
    alert("You haven't saved any templates yet");
  }
});

// listener кнопки выбора рандомной игры
randomButtom.addEventListener("click", () => {
  clearGameArea();
  const randomIndex = Math.floor(Math.random() * currentTemplates.length);
  const selectedTemplate = currentTemplates[randomIndex];
  sizeSelect.value = selectedTemplate.size;
  sizeSelect.dispatchEvent(new Event("change"));
  pictureSelect.value = selectedTemplate.name;
  pictureSelect.dispatchEvent(new Event("change"));
});

// listener для кнопки закрытия модального окна с результатами
closeResultsButton.addEventListener("click", () => {
  modalResults.classList.remove("visible");
});

function displayBestScores() {
  const bestScores = getItemFromLocalStorage("gameResults") || [];
  bestScores.forEach((result, index) => {
    const timeFormatted = getTimerByTime(result.time);
    const scoreText = document.createElement("p");
    scoreText.textContent = `${index + 1}. Game: ${result.gameName} ||
    Difficulty: ${result.difficulty} ||
    Time: ${timeFormatted}`;
    modalResultsContentText.append(scoreText);
  });
}

// listener для отображения модалки 5 последних результатов игры
lastResultsButton.addEventListener("click", () => {
  modalResults.classList.add("visible");
  modalResultsContentText.textContent = "";
  modalResultsContentText.append(lastResultsText);
  displayBestScores();
});

// listener для кнопки смены темы
changeThemebutton.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    switchToDarkMode();
  } else {
    switchToLightMode();
  }
});

// listener для кнопки вкл./выкл. звука
soundButton.addEventListener("click", toggleSound);

chooseGameArea.append(sizeSelectWrap, pictureSelectWrap);
sizeSelectWrap.append(labelSize, sizeSelect);
pictureSelectWrap.append(labelPicture, pictureSelect);

document.addEventListener("DOMContentLoaded", () => {
  fillPictureSelect(PICTURE_SIZE);
});
