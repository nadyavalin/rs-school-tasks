/* global document */
import words from "./words.js";

// Modal
/* <div class="modal">
  <div class="modal__content">
    <h2 class="modal__lose-title"></h2>
    <p></p>
    <button class="modal__button-play-again">Play again!</button>
  </div>
</div> */

const modal = document.createElement("div");
modal.classList.add("modal");
document.body.append(modal);

const modalContent = document.createElement("div");
modalContent.classList.add("modal__content");
modal.append(modalContent);

const h2 = document.createElement("h2");
h2.classList.add("modal__lose-title");
const p = document.createElement("p");
const buttonPlayAgain = document.createElement("button");
buttonPlayAgain.classList.add("modal__button-play-again");
buttonPlayAgain.innerText = "Play again!";
modalContent.append(h2, p, buttonPlayAgain);

// Main container
const main = document.createElement("main");
main.classList.add("main");
document.body.append(main);

// Sections
const gallowsSection = document.createElement("section");
const wordsGuessingSection = document.createElement("section");
gallowsSection.classList.add("gallows-container");
wordsGuessingSection.classList.add("words-guessing-container");
main.append(gallowsSection, wordsGuessingSection);

// Gallows Section
// <img src="./assets/images/gallows.png" class="gallows-img" alt="Gallows">
const gallowsImage = document.createElement("img");
gallowsImage.src = "./assets/images/gallows.png";
gallowsImage.classList.add("gallows-img");
gallowsImage.alt = "Gallows";

// <div class="ground"></div>
const ground = document.createElement("div");
ground.classList.add("ground");

// <h1>Hangman game</h1>
const h1 = document.createElement("h1");
h1.innerText = "Hangman game";
gallowsSection.append(gallowsImage, ground, h1);

// Words Guessing Sections
// <ul class="word"></ul>
const ul = document.createElement("ul");
ul.classList.add("word");

// <div class="hint-text"></div>
const hintText = document.createElement("div");
hintText.classList.add("hint-text");

// <p class="incorrect-guesses-text">Incorrect guesses: <span>0/6</span></p>
const incorrectGuessesText = document.createElement("p");
incorrectGuessesText.classList.add("incorrect-guesses-text");

const incorrectGuessesTextSpan = document.createElement("span");
incorrectGuessesText.innerText = "Incorrect guesses: ";
incorrectGuessesText.append(incorrectGuessesTextSpan);

// <div class="keyboard"></div>
const keyboard = document.createElement("div");
keyboard.classList.add("keyboard");
wordsGuessingSection.append(ul, hintText, incorrectGuessesText, keyboard);

// Hangman
// Temporary remainder */
/* <div class="gallows-container__hangman-head">
    <img src="./assets/svg/1-head.svg" class="hangman-head" alt="Hangman head">
  </div>
  <div class="gallows-container__hangman-body-arms">
    <img src="./assets/svg/3-arm-one.svg" class="hangman-arm-one" alt="Hangman arm one">
    <img src="./assets/svg/2-body.svg" class="hangman-body" alt="Hangman body">
    <img src="./assets/svg/4-arm-two.svg" class="hangman-arm-two" alt="Hangman arm two">
  </div>
  <div class="gallows-container__hangman-legs">
    <img src="./assets/svg/5-leg-one.svg" class="hangman-leg-one" alt="Hangman leg one">
    <img src="./assets/svg/6-leg-two.svg" class="hangman-leg-two" alt="Hangman leg two">
  </div> */

const hangmanHeadDiv = document.createElement("div");
const hangmanBodyAndArmsDiv = document.createElement("div");
const hangmanLegsDiv = document.createElement("div");
hangmanHeadDiv.classList.add("gallows-container__hangman-head");
hangmanBodyAndArmsDiv.classList.add("gallows-container__hangman-body-arms");
hangmanLegsDiv.classList.add("gallows-container__hangman-legs");
gallowsSection.append(hangmanHeadDiv, hangmanBodyAndArmsDiv, hangmanLegsDiv);

// Hangman head
const hangmanHead = document.createElement("img");
hangmanHead.src = "./assets/svg/1-head.svg";
hangmanHead.classList.add("hangman-head");
hangmanHead.alt = "Hangman head";
hangmanHeadDiv.append(hangmanHead);

// Hangman body and arms
const hangmanBody = document.createElement("img");
const hangmanArmOne = document.createElement("img");
const hangmanArmTwo = document.createElement("img");

hangmanBody.src = "./assets/svg/2-body.svg";
hangmanArmOne.src = "./assets/svg/3-arm-one.svg";
hangmanArmTwo.src = "./assets/svg/4-arm-two.svg";

hangmanBody.classList.add("hangman-body");
hangmanArmOne.classList.add("hangman-arm-one");
hangmanArmTwo.classList.add("hangman-arm-two");

hangmanBody.alt = "Hangman body";
hangmanArmOne.alt = "Hangman arm one";
hangmanArmTwo.alt = "Hangman arm two";

hangmanBodyAndArmsDiv.append(hangmanArmOne, hangmanBody, hangmanArmTwo);

// Hangman legs
const hangmanLegOne = document.createElement("img");
const hangmanLegTwo = document.createElement("img");

hangmanLegOne.src = "./assets/svg/5-leg-one.svg";
hangmanLegTwo.src = "./assets/svg/6-leg-two.svg";

hangmanLegOne.classList.add("hangman-leg-one");
hangmanLegTwo.classList.add("hangman-leg-two");

hangmanLegOne.alt = "Hangman leg one";
hangmanLegTwo.alt = "Hangman leg two";

hangmanLegsDiv.append(hangmanLegOne, hangmanLegTwo);

const wordText = document.querySelector(".word");
let currentWord;
let correctLetters;
let wrongAttemptsCounter;
const maxAttempts = 6;

// Game end
function gameOver(win) {
  setTimeout(() => {
    const modalText = win ? "You found the word:" : "The correct word is:";
    modal.querySelector(".modal__lose-title").innerText = win
      ? "Congratulations!"
      : "Game over!";
    modal.querySelector(
      "p",
    ).innerHTML = `${modalText} <span>${currentWord}</span>`;
    modal.classList.add("visible");
  }, 300);
}

// Game start
const buttons = [];

function guessTheLetter(clickedLetter) {
  if (wrongAttemptsCounter >= maxAttempts) {
    return;
  }

  if (currentWord.includes(clickedLetter)) {
    const wordTextLi = wordText.querySelectorAll("li");
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordTextLi[index].innerText = letter;
        wordTextLi[index].classList.add("guessed");
      }
    });
  } else {
    wrongAttemptsCounter += 1;
    incorrectGuessesTextSpan.innerHTML = `${wrongAttemptsCounter} / ${maxAttempts}`;

    switch (wrongAttemptsCounter) {
      case 1:
        hangmanHead.style.display = "block";
        break;
      case 2:
        hangmanBody.style.display = "block";
        break;
      case 3:
        hangmanArmOne.style.display = "block";
        break;
      case 4:
        hangmanArmTwo.style.display = "block";
        break;
      case 5:
        hangmanLegOne.style.display = "block";
        break;
      case 6:
        hangmanLegTwo.style.display = "block";
        break;
      default:
        break;
    }
  }

  const targetButton = buttons.find(
    (button) => button.textContent === clickedLetter,
  );

  if (targetButton) {
    targetButton.disabled = true;
  }

  if (wrongAttemptsCounter === maxAttempts) {
    gameOver(false);
  }

  if (correctLetters.length === currentWord.length) {
    gameOver(true);
  }
}

// Keyboard
for (let i = 97; i <= 122; i += 1) {
  const button = document.createElement("button");
  button.textContent = String.fromCharCode(i).toLowerCase();
  button.tabIndex = i - 96;
  buttons.push(button);
  keyboard.appendChild(button);
}

keyboard.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (button) {
    const letter = button.textContent;
    guessTheLetter(letter);
  }
});

function resetGame() {
  correctLetters = [];
  wrongAttemptsCounter = 0;
  incorrectGuessesTextSpan.innerHTML = `${wrongAttemptsCounter} / ${maxAttempts}`;
  keyboard.querySelectorAll("button").forEach((btn) => {
    btn.removeAttribute("disabled");
  });
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
let previousWord = null;

function getRandomWordAndHint() {
  let randomWord = Math.floor(Math.random() * words.length);
  const { word, hint } = words[randomWord];

  if (word === previousWord) {
    randomWord = (randomWord + 1) % words.lengtth;
    const { word: newWord, hint: newHint } = words[randomWord];
    currentWord = newWord;
    hintText.innerHTML = `Hint: ${newHint}`;
    resetGame();
    previousWord = newWord;
  } else {
    currentWord = word;
    hintText.innerHTML = `Hint: ${hint}`;
    resetGame();
    previousWord = word;
  }
}

getRandomWordAndHint();

buttonPlayAgain.addEventListener("click", getRandomWordAndHint);

let guessedLetters = [];

document.addEventListener("keydown", (e) => {
  if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
    const key = e.key.toLowerCase();
    if (!guessedLetters.includes(key)) {
      guessedLetters.push(key);
      guessTheLetter(key);
    } else {
      alert("This letter has already been used! Эта буква уже использовалась!");
    }
  }

  if (e.key === "Enter" && modal.classList.contains("visible")) {
    guessedLetters = [];
    getRandomWordAndHint();
  }

  if (e.key.length === 1 && e.key.match(/[а-яё]/i)) {
    alert("Please switch the language to English! Пожалуйста, переключите язык на английский!");
  }
});
