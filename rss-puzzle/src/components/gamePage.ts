import { createDiv, createSpan } from "./elements";
import { wordsLevelOne } from "../data/words/wordsLevelOne";
// import { wordsLevelTwo } from "../data/words/wordsLevelTwo";
// import { wordsLevelThree } from "../data/words/wordsLevelThree";
// import { wordsLevelFour } from "../data/words/wordsLevelFour";
// import { wordsLevelFive } from "../data/words/wordsLevelFive";
// import { wordsLevelSix } from "../data/words/wordsLevelSix";

// const levels = [
//   wordsLevelOne,
//   wordsLevelTwo,
//   wordsLevelThree,
//   wordsLevelFour,
//   wordsLevelFive,
//   wordsLevelSix,
// ];

const getRandomSentence = () => {
  const randomRound =
    wordsLevelOne.rounds[
      Math.floor(Math.random() * wordsLevelOne.rounds.length)
    ];
  const randomWord =
    randomRound.words[Math.floor(Math.random() * randomRound.words.length)];
  return randomWord.textExample;
};

const gameArea = createDiv("game-area");
const resultArea = createDiv("result-area");
const sourceArea = createDiv("source-area");

const resultSentences: HTMLDivElement = createDiv("result-sentences");
new Array(10).fill(null).forEach(() => {
  // const randomSentence = getRandomSentence();
  // const words = randomSentence.split(" ");
  // const spannedWords: HTMLSpanElement[] = words.map((word) =>
  //   createSpan("puzzle-items", word),
  // );
  // const resultSentences = createDiv("result-sentences");
  // spannedWords.forEach((span) => {
  //   resultSentences.append(span);
  // });
  resultArea.append(resultSentences);
});

const sourceRandomSentence = getRandomSentence();
const sourceWords = sourceRandomSentence
  .split(" ")
  .sort(() => Math.random() - 0.5);
const spannedsourceWords = sourceWords.map((word) =>
  createSpan("puzzle-items", word),
);

sourceArea.addEventListener("click", (event) => {
  const span = event.target as HTMLSpanElement;
  if (span.classList.contains("puzzle-items")) {
    span.classList.add("moveRight");
    setTimeout(() => {
      resultSentences.append(span);
      span.classList.remove("moveRight");
      span.classList.add("chosen");
      span.style.width = `${span.offsetWidth}px`;
    }, 500);
  }
});

const alphabetLength = 26;
const totalWordWidths = spannedsourceWords.reduce(
  (total, span) => total + (100 * span.innerText.length) / alphabetLength,
  0,
);
const scale = totalWordWidths > 100 ? 100 / totalWordWidths : 1;

spannedsourceWords.forEach((span) => {
  const spanCopy = span as HTMLSpanElement;
  const scaledWidth =
    (scale * (100 * spanCopy.innerText.length)) / alphabetLength;
  spanCopy.style.width = `${scaledWidth}%`;
  sourceArea.append(spanCopy);
});

gameArea.append(resultArea, sourceArea);

export default gameArea;
