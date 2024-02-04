import { createButton } from "./createElements.js";
import { buttonContainer, optionButtonContainer } from "./globalVariables.js";

// кнопка сброса текущей игры
export const resetButton = createButton(["button"], "Reset game");
buttonContainer.append(resetButton);

// кнопка Показать решение
export const solutionButton = createButton(["button"], "Solution");
buttonContainer.append(solutionButton);

// кнопка сохранения игры - сохраняется промежуточный результат
export const saveButton = createButton(["button"], "Save game");
buttonContainer.append(saveButton);

// кнопка Продолжить игру
export const continueButton = createButton(["button"], "Continue last game");
buttonContainer.append(continueButton);

// кнопка выбора рандомной игры
export const randomButtom = createButton(["button"], "Random game");
buttonContainer.append(randomButtom);

// кнопка для отображения модалки - 5 последних результатов игры
export const lastResultsButton = createButton(["button"], "Scores");
buttonContainer.append(lastResultsButton);

// кнопка смена темы
export const changeThemebutton = createButton(["button"], "Dark theme");
optionButtonContainer.append(changeThemebutton);

// кнопка вкл./выкл. звуков
export const soundButton = createButton(["button"], "Off sounds");
optionButtonContainer.appendChild(soundButton);
