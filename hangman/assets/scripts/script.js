/* global document */

// const keyboard = document.createElement("div");
// keyboard.classList.add("keyboard");

const keyboard = document.querySelector(".keyboard"); // temporary

for (let i = 97; i <= 122; i += 1) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
}
