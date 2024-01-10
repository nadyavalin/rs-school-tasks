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
const modal = document.querySelector(".modal"); // temporary
const buttonPlayAgain = document.querySelector(".modal__button-play-again"); // temporary

let currentWord;
let correctLetters;
let wrongAttemptsCounter;
const maxAttempts = 6;

// Game end
function gameOver(win) {
  setTimeout(() => {
    const modalText = win ? "You found the word:" : "The correct word is:";
    modal.querySelector(".modal__lose-title").innerText = `${
      win ? "Congratulations!" : "Game over!"
    }`;
    modal.querySelector(
      "p",
    ).innerHTML = `${modalText} <span>${currentWord}</span>`;
    modal.classList.add("visible");
  }, 300);
}

// Game start
function startGame(button, clickedLetter) {
  if (wrongAttemptsCounter >= maxAttempts) {
    return;
  }
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
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
  button.disabled = true;

  if (wrongAttemptsCounter === maxAttempts) {
    return gameOver(false);
  }

  if (correctLetters.length === currentWord.length) {
    return gameOver(true);
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

function resetGame() {
  correctLetters = [];
  wrongAttemptsCounter = 0;
  incorrectGuessesText.innerText = `${wrongAttemptsCounter} / ${maxAttempts}`;
  keyboard.querySelectorAll("button").forEach((btn) => btn.disabled = false);
  wordText.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  modal.classList.remove("visible");
  hangmanHead.style.display = "none";
  hangmanBody.style.display = "none";
  hangmanArmOne.style.display = "none";
  hangmanArmTwo.style.display = "none";
  hangmanLegOne.style.display = "none";
  hangmanLegTwo.style.display = "none";
}

// Word and Hint
function getRundomWordAndHint() {
  const { word, hint } = words[Math.floor(Math.random() * words.length)];
  currentWord = word;
  console.log = word;
  hintText.innerHTML = hint;
  resetGame();
}

getRundomWordAndHint();

buttonPlayAgain.addEventListener("click", getRundomWordAndHint);
