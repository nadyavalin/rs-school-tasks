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
const hangmanHead = document.querySelector(".hangman-head"); // temporary
const hangmanBody = document.querySelector(".hangman-body"); // temporary
const hangmanArmOne = document.querySelector(".hangman-arm-one"); // temporary
const hangmanArmTwo = document.querySelector(".hangman-arm-two"); // temporary
const hangmanLegOne = document.querySelector(".hangman-leg-one"); // temporary
const hangmanLegTwo = document.querySelector(".hangman-leg-two"); // temporary

let currentWord;
let wrongAttemptsCounter = 0;
const maxAttempts = 6;

// Game
function startGame(button, clickedLetter) {
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
    incorrectGuessesText.innerText = `${wrongAttemptsCounter} / ${maxAttempts}`;

    switch (wrongAttemptsCounter) {
      case 1:
        hangmanHead.style.display = "grid";
        break;
      case 2:
        hangmanBody.style.display = "grid";
        break;
      case 3:
        hangmanArmOne.style.display = "grid";
        break;
      case 4:
        hangmanArmTwo.style.display = "grid";
        break;
      case 5:
        hangmanLegOne.style.display = "grid";
        break;
      case 6:
        hangmanLegTwo.style.display = "grid";
        break;
      default:
    }
  }
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
