import { createButton, createDiv, createText } from "./elements";
import { createWinnersTable, garageArea, renderGarageContent, showGaragePage, winnersContent } from "./functions";
import { state } from "../store/state";
import { chooseModesContainer } from "./modesArea";

export const chooseRoomContainer = createDiv("choose-room-container");
const toGarage = createButton("garage", ["garage-button", "garage-button_disabled"], "To garage");
const toWinners = createButton("winners", ["winners-button"], "To winners");
export const prevNextButtons = createDiv("prev-next-buttons");
export const prevButton = createButton("prev", ["prev-button"], "prev");
export const nextButton = createButton("next", ["next-button"], "next");
state.components.nextButton = nextButton;

chooseRoomContainer.append(toGarage, toWinners);
prevNextButtons.append(prevButton, nextButton);

toWinners.addEventListener("click", async () => {
  toWinners.classList.add("winners-button_disabled");
  const winnersText = createText("winners-text", `Winners (1)`);
  const pagesWinnersText = createText("pages", `Page #1`);
  winnersContent.innerHTML = "";
  winnersContent.append(winnersText, pagesWinnersText);

  const winnersTable = await createWinnersTable();
  toGarage.classList.remove("garage-button_disabled");
  document.body.removeChild(chooseModesContainer);
  document.body.removeChild(garageArea);
  document.body.append(winnersTable, prevNextButtons);
});

toGarage.addEventListener("click", async () => {
  toGarage.classList.add("garage-button_disabled");
  const garagePage = await showGaragePage();
  toWinners.classList.remove("winners-button_disabled");
  garageArea.append(garagePage);
  document.body.removeChild(winnersContent);
  document.body.append(chooseModesContainer, garageArea, prevNextButtons);
});

prevButton.addEventListener("click", async () => {
  if (state.page > 1) {
    prevButton.classList.add("prev-button_disabled");
    nextButton.classList.add("next-button_disabled");
    state.page -= 1;
    nextButton.classList.remove("next-button_disabled");
    await renderGarageContent();
    if (state.page !== 1) {
      prevButton.classList.remove("prev-button_disabled");
    }
  }
});

nextButton.addEventListener("click", async () => {
  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  if (state.page < totalPages) {
    prevButton.classList.add("prev-button_disabled");
    nextButton.classList.add("next-button_disabled");
    state.page += 1;
    prevButton.classList.remove("prev-button_disabled");
    await renderGarageContent();
    if (state.page !== totalPages) {
      nextButton.classList.remove("next-button_disabled");
    }
  }
});
