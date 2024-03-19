import { GameData } from "src/type/interfacesAndTypes";
import {
  createButton,
  createDiv,
  createSpan,
  createLabel,
  createSelect,
  createOption,
} from "./elements";
import { wordsLevelOne } from "../data/wordsLevelOne";
import { wordsLevelTwo } from "../data/wordsLevelTwo";
import { wordsLevelThree } from "../data/wordsLevelThree";
import { wordsLevelFour } from "../data/wordsLevelFour";
import { wordsLevelFive } from "../data/wordsLevelFive";
import { wordsLevelSix } from "../data/wordsLevelSix";

const levels = [
  wordsLevelOne,
  wordsLevelTwo,
  wordsLevelThree,
  wordsLevelFour,
  wordsLevelFive,
  wordsLevelSix,
];

const gameArea = createDiv("game-area");
const resultArea = createDiv("result-area");
const sourceArea = createDiv("source-area");

const buttonContainer = createDiv("button-container");
const sentenceConainer = createDiv("sentence-container");
const hintContainer = createDiv("hint-container");
const optionsContainer = createDiv("option-container");

const checkButton = createButton("check", "check-button", "Check");
checkButton.classList.add("disabled");

const continueButton = createButton("continue", "continue-button", "Continue");
continueButton.classList.add("not-available");

const autoCompleteButton = createButton(
  "auto-complete",
  "auto-complete-button",
  "I don't know",
);
const hintTranslationButton = createButton(
  "translation",
  "hint-translation-button",
);
hintTranslationButton.classList.add("hint-translation-button_on");

const hintTranslationSentence = createDiv("hint-translation-sentence");
hintTranslationSentence.classList.add("hint-translation-sentence_show");

const hintSoundButton = createButton("hint-sound", "hint-sound-button");
hintSoundButton.classList.add("hint-sound-button_on");

const soundButton = createButton("sound", "sound-button");
soundButton.classList.add("sound-button_show");

const levelLabel = createLabel("level", "level-label", "Level:");
const roundLabel = createLabel("round", "round-label", "Round:");

const levelsSelect = createSelect("levels", "levels-select", "levels-select");
const roundsSelect = createSelect("rounds", "rounds-select", "rounds-select");

let currentLevel = 0;
let currentRound = 0;
let currentSentence = -1;
let sourceSentence: string;
let sourceRandomWords: string[];
let resultSentence: HTMLDivElement;
let draggedWord: HTMLSpanElement | undefined;

hintTranslationButton.addEventListener("click", () => {
  hintTranslationButton.classList.toggle("hint-translation-button_on");
  hintTranslationSentence.classList.toggle("hint-translation-sentence_show");
});

hintSoundButton.addEventListener("click", () => {
  hintSoundButton.classList.toggle("hint-sound-button_on");
  soundButton.classList.toggle("sound-button_show");
});

function checkResultSentenceLength() {
  const properWords = sourceSentence.split(" ");
  if (resultSentence.children.length === properWords.length) {
    checkButton.classList.remove("disabled");
  } else {
    checkButton.classList.add("disabled");
  }
}

function resetHighlights() {
  [...resultSentence.children].forEach((span) => {
    span.classList.remove("mistake", "correct");
  });
}

function dragStart(event: DragEvent | TouchEvent) {
  draggedWord = event.target as HTMLSpanElement;
}

function dragOver(event: DragEvent | TouchEvent) {
  event.preventDefault();
}

function drop(event: DragEvent | TouchEvent) {
  event.preventDefault();
  const dropArea = event.target as HTMLDivElement;
  if (
    draggedWord &&
    (Number(dropArea.dataset.currentSentence) === currentSentence ||
      dropArea.classList.contains("source-area"))
  ) {
    dropArea.append(draggedWord);
    resetHighlights();
    checkResultSentenceLength();
  }
}

function getNextSentence() {
  if (currentSentence % 10 === 9) {
    currentRound += 1;
    currentSentence = 0;
    resultArea.innerHTML = "";
    if (currentRound >= levels[currentLevel].rounds.length) {
      currentLevel += 1;
      currentRound = 0;
    }
  } else {
    currentSentence += 1;
  }
  const round = levels[currentLevel].rounds[currentRound];
  const sentence = round.words[currentSentence].textExample;
  hintTranslationSentence.textContent =
    round.words[currentSentence].textExampleTranslate;
  return sentence;
}

function setCorrectWidthForCards(spannedWords: HTMLSpanElement[]) {
  const wordWidth = 7;
  const totalWordsWidth = spannedWords.reduce(
    (total, span) => total + wordWidth * span.innerText.length,
    0,
  );
  spannedWords.forEach((span) => {
    const spanCopy = span as HTMLSpanElement;
    const scaledWidth =
      ((wordWidth * spanCopy.innerText.length) / totalWordsWidth) * 100;
    spanCopy.style.width = `${scaledWidth}%`;
  });
}

function createNextSentence() {
  sourceSentence = getNextSentence();
  sourceRandomWords = sourceSentence.split(" ").sort(() => Math.random() - 0.5);
  const spannedSourceWords = sourceRandomWords.map((word) =>
    createSpan("puzzle-item", word),
  );
  spannedSourceWords.forEach((span) => {
    sourceArea.append(span);
    span.setAttribute("draggable", "true");
    span.addEventListener("dragstart", dragStart);
    span.addEventListener("touchstart", dragStart);
  });
  setCorrectWidthForCards(spannedSourceWords);
  sourceArea.append(...spannedSourceWords);
}
createNextSentence();

function createLevelOptions(levelOptions: GameData[]): HTMLOptionElement[] {
  return levelOptions.map((level, index) =>
    createOption((index + 1).toString(), (index + 1).toString()),
  );
}
const levelOptions = createLevelOptions(levels);
levelOptions.forEach((option) => levelsSelect.append(option));

function createAllRoundOptions(numOfRounds: number): HTMLOptionElement[] {
  const roundOptions = [];
  for (let i = 1; i <= numOfRounds; i += 1) {
    const option = createOption(i.toString(), i.toString());
    roundOptions.push(option);
  }
  return roundOptions;
}

function levelSelectChangeHandler() {
  currentLevel = parseInt(levelsSelect.value, 10) - 1;
  const numOfRounds = levels[currentLevel].roundsCount;
  const roundOptions = createAllRoundOptions(numOfRounds);
  roundsSelect.innerHTML = "";
  roundsSelect.append(...roundOptions);
  roundsSelect.selectedIndex = 0;
  currentRound = 0;
  sourceArea.innerHTML = "";
  resultArea.innerHTML = "";
  currentSentence = -1;
  createNextSentence();
  resultArea.append(resultSentence);
  checkButton.classList.add("disabled");
  checkButton.classList.remove("not-available");
  continueButton.classList.add("not-available");
}

createAllRoundOptions(45).forEach((option) => roundsSelect.append(option));
function roundSelectChangeHandler() {
  currentSentence = -1;
  resultArea.innerHTML = "";
  resultArea.append(resultSentence);
  checkButton.classList.add("disabled");
  checkButton.classList.remove("not-available");
  continueButton.classList.add("not-available");
  sourceArea.innerHTML = "";
  currentRound = parseInt(roundsSelect.value, 10) - 1;
  createNextSentence();
}

levelsSelect.addEventListener("change", levelSelectChangeHandler);
roundsSelect.addEventListener("change", roundSelectChangeHandler);

function playAudio() {
  const round = levels[currentLevel].rounds[currentRound];
  const audio = new Audio(
    `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/${round.words[currentSentence].audioExample}`,
  );
  soundButton.classList.add("sound-button_play");
  audio.play();

  audio.addEventListener("ended", () => {
    soundButton.classList.remove("sound-button_play");
  });
}

soundButton.addEventListener("click", playAudio);

function createResultSentence() {
  resultSentence = createDiv("result-sentence");
  resultSentence.setAttribute(
    "data-current-sentence",
    `${currentSentence === -1 ? 0 : currentSentence}`,
  );
  resultSentence.addEventListener("dragover", dragOver);
  resultSentence.addEventListener("drop", drop);
  resultSentence.addEventListener("touchmove", dragOver);
  resultSentence.addEventListener("touchend", drop);
  resultArea.append(resultSentence);
}
createResultSentence();

function highlightMistakes() {
  const properWords = sourceSentence.split(" ");
  [...resultSentence.children].forEach((span, index) => {
    if (span.textContent !== properWords[index]) {
      span.classList.add("mistake");
    } else {
      span.classList.add("correct");
    }
  });
}

function moveSpanToResultArea(span: HTMLSpanElement) {
  span.classList.add("puzzle-item_disappear");
  setTimeout(() => {
    resultSentence.append(span);
    span.classList.remove("puzzle-item_disappear");
    checkResultSentenceLength();
  }, 300);
}

function moveSpanToSourceArea(span: HTMLSpanElement) {
  span.classList.add("puzzle-item_disappear");
  setTimeout(() => {
    sourceArea.append(span);
    span.classList.remove("puzzle-item_disappear");
    checkButton.classList.add("disabled");
  }, 300);
}

sourceArea.addEventListener("click", (event) => {
  const clickedElement = event.target as HTMLElement;
  if (clickedElement.classList.contains("puzzle-item")) {
    const span = clickedElement as HTMLSpanElement;
    resetHighlights();
    moveSpanToResultArea(span);
  }
});
sourceArea.addEventListener("dragover", dragOver);
sourceArea.addEventListener("drop", drop);

resultArea.addEventListener("click", (event) => {
  const clickedElement = event.target as HTMLElement;
  if (clickedElement.classList.contains("puzzle-item")) {
    const span = clickedElement as HTMLSpanElement;
    resetHighlights();
    moveSpanToSourceArea(span);
  }
});

checkButton.addEventListener("click", () => {
  resetHighlights();
  const resultText = [...resultSentence.children].reduce((acc, span, index) => {
    if (!span.textContent) {
      return acc;
    }
    return index === 0 ? span.textContent : `${acc} ${span.textContent}`;
  }, "");
  if (resultText === sourceSentence) {
    resetHighlights();
    continueButton.classList.remove("not-available");
    checkButton.classList.add("not-available");
    resultSentence.classList.add("result-sentence_done");
    soundButton.classList.add("sound-button_always-show");
    autoCompleteButton.classList.add("disabled");
    hintTranslationSentence.classList.add(
      "hint-translation-sentence_always-show",
    );
  }
  highlightMistakes();
});

continueButton.addEventListener("click", () => {
  checkButton.classList.add("disabled");
  checkButton.classList.remove("not-available");
  continueButton.classList.add("not-available");
  autoCompleteButton.classList.remove("disabled");
  hintTranslationSentence.classList.remove(
    "hint-translation-sentence_always-show",
  );
  soundButton.classList.remove("sound-button_always-show");
  resetHighlights();
  createNextSentence();
  createResultSentence();
});

autoCompleteButton.addEventListener("click", () => {
  const guessedWords = sourceSentence.split(" ");
  checkButton.classList.add("not-available");
  continueButton.classList.remove("not-available");
  resultSentence.classList.add("result-sentence_done");
  resultSentence.innerHTML = "";
  sourceArea.innerHTML = "";
  hintTranslationSentence.classList.add(
    "hint-translation-sentence_always-show",
  );
  soundButton.classList.add("sound-button_always-show");
  setCorrectWidthForCards(
    guessedWords.map((word) => {
      const span = createSpan("puzzle-item", word);
      resultSentence.append(span);
      return span;
    }),
  );
});

optionsContainer.append(levelLabel, levelsSelect, roundLabel, roundsSelect);
buttonContainer.append(checkButton, continueButton, autoCompleteButton);
sentenceConainer.append(hintTranslationSentence, soundButton);
hintContainer.append(hintTranslationButton, hintSoundButton);
gameArea.append(
  optionsContainer,
  hintContainer,
  sentenceConainer,
  resultArea,
  sourceArea,
  buttonContainer,
);

export default gameArea;
