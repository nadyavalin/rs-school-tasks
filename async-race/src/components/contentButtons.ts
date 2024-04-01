import { createButton, createDiv } from "./elements";

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
