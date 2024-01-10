/* global document */
import words from "./words.js";

// const keyboard = document.createElement("div");
// keyboard.classList.add("keyboard");

const keyboard = document.querySelector(".keyboard"); // temporary
const hintText = document.querySelector(".hint-text"); // temporary
const wordText = document.querySelector(".word"); // temporary
const incorrectGuessesText = document.querySelector(
  ".incorrect-guesses-text span",
); // temporary

let currentWord;
let wrongAttemptsCounter = 0;
const maxAttempts = 6;

// Game
function startGame(clickedLetter) {
  if (wrongAttemptsCounter >= maxAttempts) {
    return;
  }
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        wordText.querySelectorAll("li")[index].innerText = letter;
        wordText.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongAttemptsCounter += 1;
  }
  incorrectGuessesText.innerText = `${wrongAttemptsCounter} / ${maxAttempts}`;
}

// Keyboard
for (let i = 97; i <= 122; i += 1) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    startGame(e.target, String.fromCharCode(i)),
  );
}

// Word and Hint
function getRundomWordAndHint() {
  const { word, hint } = words[Math.floor(Math.random() * words.length)];
  currentWord = word;
  hintText.innerHTML = hint;
  wordText.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
}

getRundomWordAndHint();
