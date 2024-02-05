import { createAudio } from "./createElements.js";
import { soundButton } from "./buttons.js";

// звук для закрашивания ячейки черным
export const blackCellAudio = createAudio("./audio/black-cell.mp3");

// звук для отметки ячейки крестом
export const crossCellAudio = createAudio("./audio/cross-cell.mp3");

// звук для обнуления цвета ячейки
export const whiteCellAudio = createAudio("./audio/white-cell.wav");

// звук победы
export const winAudio = createAudio("./audio/win-song.mp3");

// включение/выключение звука
export function toggleSound() {
  blackCellAudio.muted = !blackCellAudio.muted;
  crossCellAudio.muted = !crossCellAudio.muted;
  whiteCellAudio.muted = !whiteCellAudio.muted;
  winAudio.muted = !winAudio.muted;
  if (soundButton.textContent === "On sounds") {
    soundButton.textContent = "Off sounds";
  } else {
    soundButton.textContent = "On sounds";
  }
}

// listener для кнопки вкл./выкл. звука
soundButton.addEventListener("click", toggleSound);
