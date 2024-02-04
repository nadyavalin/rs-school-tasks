import { createAudio } from "./createElements.js";

// звук для закрашивания ячейки черным
export const blackCellAudio = createAudio("./audio/black-cell.mp3");

// звук для отметки ячейки крестом
export const crossCellAudio = createAudio("./audio/cross-cell.mp3");

// звук для обнуления цвета ячейки
export const whiteCellAudio = createAudio("./audio/white-cell.wav");

// звук победы
export const winAudio = createAudio("./audio/win-song.mp3");
