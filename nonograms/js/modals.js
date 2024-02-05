import { createDiv, createButton } from "./createElements.js";

// модальное окно завершения игры
export const modal = createDiv(["modal"]);
export const modalContent = createDiv(["modal__content"]);
export const lastResultsText = document.createElement("h5");
export const closeButton = createButton(["button"], "Close");
lastResultsText.textContent = `Your last best scores:`;

document.body.append(modal);
modal.append(modalContent);

// модальное окно для вывода 5 последних результатов игры
export const modalResults = createDiv(["modal-result"]);
export const modalResultsContent = createDiv(["modal-result__content"]);
export const modalResultsContentText = createDiv(["modal-result__content-text"]);
export const closeResultsButton = createButton(["button"], "Close");

document.body.append(modalResults);
modalResults.append(modalResultsContent);
modalResultsContent.append(modalResultsContentText, closeResultsButton);

// listener для кнопки закрытия модального окна с результатами
closeResultsButton.addEventListener("click", () => {
  modalResults.classList.remove("visible");
});
