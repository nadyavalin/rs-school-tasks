import { createDiv } from "./createElements.js";

export const MAX_RESULTS = 5;
export const DEFAULT_SIZE_PICTURE = 5;

export const chooseGameArea = createDiv(["choose-game-area"]);
document.body.append(chooseGameArea);

export const timer = createDiv(["timer"], "00:00");
document.body.append(timer);

export const gameArea = createDiv(["game-area"]);
document.body.append(gameArea);

// общий контейнер для кнопок
export const buttonContainer = createDiv(["button-container"]);
document.body.append(buttonContainer);

// контейнер для кнопок Смена темы и Вкл./Выкл. звуков
export const optionButtonContainer = createDiv(["option-button-container"]);
document.body.append(optionButtonContainer);
