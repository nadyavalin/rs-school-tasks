import { createButton, createDiv, createSpan } from "./elements";
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

let currentLevel = 0;
let currentRound = 0;
let currentSentence = -1;

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
  return sentence;
}

let resultSentence: HTMLDivElement;
function createResultSentence() {
  resultSentence = createDiv("result-sentence");
  resultArea.append(resultSentence);
}
createResultSentence();

let sourceSentence: string;
function createNextSentence() {
  sourceSentence = getNextSentence();
  const sourceWords = sourceSentence.split(" ").sort(() => Math.random() - 0.5);
  const spannedSourceWords: HTMLSpanElement[] = sourceWords.map((word) =>
    createSpan("puzzle-item", word),
  );
  const alphabetLength = 26;
  const totalWordWidths = spannedSourceWords.reduce(
    (total, span) => total + (100 * span.innerText.length) / alphabetLength,
    0,
  );
  const scale = totalWordWidths > 100 ? 100 / totalWordWidths : 1;

  spannedSourceWords.forEach((span) => {
    const spanCopy = span as HTMLSpanElement;
    const scaledWidth =
      (scale * (100 * spanCopy.innerText.length)) / alphabetLength;
    spanCopy.style.width = `${scaledWidth}%`;
    sourceArea.append(spanCopy);
  });
  sourceArea.append(...spannedSourceWords);
}
createNextSentence();

const checkButton = createButton("check", "check-button", "Check");
checkButton.classList.add("disabled");
const continueButton = createButton("continue", "continue-button", "Continue");
continueButton.classList.add("not-available");

function highlightMistakes(allWords: string[], sourceWords: string[]) {
  const allSpans = [...resultSentence.children] as HTMLSpanElement[];
  allWords.forEach((word, index) => {
    if (word !== sourceWords[index]) {
      allSpans[index].classList.add("mistake");
    } else {
      allSpans[index].classList.add("correct");
    }
  });
}

function resetHighlights() {
  const allSpans = [...resultSentence.children] as HTMLSpanElement[];
  allSpans.forEach((span) => {
    span.classList.remove("mistake");
  });
}

let sourceWords: string[];

sourceArea.addEventListener("click", (event) => {
  const clickedElement = event.target as HTMLElement;
  sourceWords = sourceSentence.split(" ");
  if (clickedElement.classList.contains("puzzle-item")) {
    const span = clickedElement as HTMLSpanElement;
    span.classList.add("puzzle-item_move-up");
    span.classList.add("chosen");
    setTimeout(() => {
      resultSentence.append(span);
      span.classList.remove("puzzle-item_move-up");

      const allSpans = [...resultSentence.children] as HTMLSpanElement[];
      const allWords = allSpans.map((word) => word.innerText);

      if (allWords.length === sourceWords.length) {
        checkButton.classList.remove("disabled");
      }
    }, 500);
  }
});

resultArea.addEventListener("click", (event) => {
  const span = event.target as HTMLSpanElement;
  if (span.classList.contains("chosen")) {
    span.classList.add("puzzle-item_move-down");
    setTimeout(() => {
      sourceArea.append(span);
      span.classList.remove("puzzle-item_move-down");
      span.classList.remove("chosen");
    }, 500);
  }
});

checkButton.addEventListener("click", () => {
  resetHighlights();
  const resultWords = Array.from(resultSentence.children).map(
    (span) => (span as HTMLSpanElement).innerText,
  );
  const formedSentence = resultWords.join(" ");
  const guessedSentence = sourceSentence;
  const allSpans = [...resultSentence.children] as HTMLSpanElement[];
  const allWords = allSpans.map((span) => span.innerText);

  if (guessedSentence === formedSentence) {
    resetHighlights();
    continueButton.classList.remove("not-available");
    checkButton.classList.add("not-available");
  }
  highlightMistakes(allWords, sourceWords);
});

continueButton.addEventListener("click", () => {
  resultSentence.classList.add("result-sentence_done");
  checkButton.classList.add("disabled");
  checkButton.classList.remove("not-available");
  continueButton.classList.add("not-available");
  createNextSentence();
  createResultSentence();
});

const buttonContainer = createDiv("button-container");
buttonContainer.append(checkButton, continueButton);

gameArea.append(resultArea, sourceArea, buttonContainer);

export default gameArea;
