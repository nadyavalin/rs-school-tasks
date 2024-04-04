import { createButton, createDiv } from "./elements";
import { renderGarageContent } from "./functions";
import { state } from "../store/state";

export const chooseRoomContainer = createDiv("choose-room-container");
export const toGarage = createButton("garage", "garage-button", "To garage");
export const toWinners = createButton(
  "winners",
  "winners-button",
  "To winners",
);
chooseRoomContainer.append(toGarage, toWinners);

export const prevNextButtons = createDiv("prev-next-buttons");
export const prevButton = createButton("prev", "prev-button", "prev");
export const nextButton = createButton("next", "next-button", "next");
prevNextButtons.append(prevButton, nextButton);

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
