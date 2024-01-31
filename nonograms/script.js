import templates from "./templates.js";

const chooseGameArea = document.createElement("div");
chooseGameArea.classList.add("choose-game-area");
document.body.append(chooseGameArea);

const timer = document.createElement("div");
timer.classList.add("timer");
timer.textContent = "00:00";
document.body.append(timer);

let interval;
function startTimer() {
  let time = 0;
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
}

function stopTimer() {
  clearInterval(interval);
}

const gameArea = document.createElement("div");
gameArea.classList.add("game-area");
document.body.append(gameArea);

const currentTemplates = [
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
  { name: "Cherry", template: templates[13], size: 15 },
  { name: "House", template: templates[14], size: 15 },
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

  /* вариант получения двумерного массива, заполненного нулями с помощью цыкла for
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
gameArea.addEventListener("click", (event) => {
  if (!interval) {
    startTimer();
  }

  // звук для закрашивания ячейки черным
  const blackCellAudio = document.createElement("audio");
  blackCellAudio.src = "./audio/black-cell.mp3";
  document.body.append(blackCellAudio);

  const cell = event.target.closest(".cell");

  if (cell) {
    cell.classList.toggle("blacked");
    cell.classList.remove("crossed");
    blackCellAudio.play();
  }

  if (compareArrays(selectedPictureTemplate, gameUserArray)) {
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

  // звук для отметки ячейки крестом
  const crossCellAudio = document.createElement("audio");
  crossCellAudio.src = "./audio/cross-cell.mp3";
  document.body.append(crossCellAudio);
  crossCellAudio.play();
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
resetButton.addEventListener("click", clearGameArea);
document.body.append(resetButton);

// TODO Смена темы
function changeTheme() {
  const { body } = document;

  if (
    body.style.backgroundImage === "linear-gradient(to left, #2ef16c, #83f7a2)"
  ) {
    body.style.backgroundImage = "linear-gradient(to left, #0d431e, #00751f)";
  } else {
    body.style.backgroundColor = "linear-gradient(to left, #2ef16c, #83f7a2)";
  }

  // if (body.style.backgroundColor === "#2ef16c") {
  //   body.style.backgroundColor = "#00751f";
  // } else {
  //   body.style.backgroundImage = "#2ef16c";
  // }
}

// Кнопка смены темы
const changeThemebutton = document.createElement("button");
changeThemebutton.classList.add("button");
changeThemebutton.textContent = "Change theme";
changeThemebutton.addEventListener("click", changeTheme);
document.body.append(changeThemebutton);

chooseGameArea.append(sizeSelectWrap, pictureSelectWrap);
sizeSelectWrap.append(labelSize, selectSize);
pictureSelectWrap.append(labelPicture, selectPicture);

document.addEventListener("DOMContentLoaded", () => {
  filterTemplate(5);
});
