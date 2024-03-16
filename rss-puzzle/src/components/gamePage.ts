import { createButton, createImage, createDiv, createSpan } from "./elements";
import { wordsLevelOne } from "../data/words/wordsLevelOne";
import { wordsLevelTwo } from "../data/words/wordsLevelTwo";
import { wordsLevelThree } from "../data/words/wordsLevelThree";
import { wordsLevelFour } from "../data/words/wordsLevelFour";
import { wordsLevelFive } from "../data/words/wordsLevelFive";
import { wordsLevelSix } from "../data/words/wordsLevelSix";

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
const checkButton = createButton("check", "check-button", "Check");
checkButton.classList.add("disabled");
const continueButton = createButton("continue", "continue-button", "Continue");
continueButton.classList.add("not-available");
const autoCompleteButton = createButton(
  "auto-complete",
  "auto-complete-button",
  "I don't know",
);
const hintTranslation = createImage(
  "../public/img/translation.png",
  "Translation",
  "image-translation",
);
hintTranslation.classList.add("image-translation-chosen");
const hintContainer = createDiv("hint-container");
const hintTranslationSentence = createDiv("hint-translation-sentence");

let currentLevel = 0;
let currentRound = 0;
let currentSentence = -1;
let sourceSentence: string;
let sourceRandomWords: string[];
let resultSentence: HTMLDivElement;
let draggedWord: HTMLSpanElement | undefined;

function showHintTranslation() {
  hintTranslation.addEventListener("click", () => {
    hintTranslationSentence.classList.toggle(
      "hint-translation-sentence_hidden",
    );
    if (
      hintTranslationSentence.classList.contains(
        "hint-translation-sentence_hidden",
      )
    ) {
      hintTranslation.classList.remove("image-translation-chosen");
    } else {
      hintTranslation.classList.add("image-translation-chosen");
    }
  });
}
showHintTranslation();

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

function dragStart(event: DragEvent) {
  draggedWord = event.target as HTMLSpanElement;
}

function dragOver(event: DragEvent) {
  event.preventDefault();
}

function drop(event: DragEvent) {
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
  const sentenceIndex = currentSentence % 10;

  if (sentenceIndex === 9) {
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
  const translation = round.words[currentSentence].textExampleTranslate;
  hintTranslationSentence.append(translation);
  return sentence;
}

function createResultSentence() {
  resultSentence = createDiv("result-sentence");
  resultSentence.setAttribute(
    "data-current-sentence",
    `${currentSentence === -1 ? 0 : currentSentence}`,
  );
  resultSentence.addEventListener("dragover", dragOver);
  resultSentence.addEventListener("drop", drop);
  resultArea.append(resultSentence);
}
createResultSentence();

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
  });
  setCorrectWidthForCards(spannedSourceWords);
  sourceArea.append(...spannedSourceWords);
}
createNextSentence();

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
    autoCompleteButton.classList.add("disabled");
    hintTranslationSentence.classList.remove(
      "hint-translation-sentence_hidden",
    );
  }
  highlightMistakes();
});

continueButton.addEventListener("click", () => {
  checkButton.classList.add("disabled");
  checkButton.classList.remove("not-available");
  continueButton.classList.add("not-available");
  autoCompleteButton.classList.remove("disabled");
  hintTranslationSentence.textContent = "";
  if (!hintTranslation.classList.contains("image-translation-chosen")) {
    hintTranslationSentence.classList.add("hint-translation-sentence_hidden");
  }
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
  hintTranslationSentence.classList.remove("hint-translation-sentence_hidden");
  setCorrectWidthForCards(
    guessedWords.map((word) => {
      const span = createSpan("puzzle-item", word);
      resultSentence.append(span);
      return span;
    }),
  );
});

const buttonContainer = createDiv("button-container");
buttonContainer.append(checkButton, continueButton, autoCompleteButton);
hintContainer.append(hintTranslation);
gameArea.append(
  hintContainer,
  hintTranslationSentence,
  resultArea,
  sourceArea,
  buttonContainer,
);

export default gameArea;
