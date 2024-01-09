/* global document */
import { words } from "./words.js";

// const keyboard = document.createElement("div");
// keyboard.classList.add("keyboard");

const keyboard = document.querySelector(".keyboard"); // temporary

for (let i = 97; i <= 122; i += 1) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
}

function getRundomWordAndHint() {
  const hintText = document.querySelector(".hint-text"); // temporary
  const wordText = document.querySelector(".word"); // temporary
  const { word, hint } = words[Math.floor(Math.random() * words.length)];
  hintText.innerHTML = hint;
  wordText.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
}

getRundomWordAndHint();
