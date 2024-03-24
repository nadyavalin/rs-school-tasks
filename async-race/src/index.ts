import "./index.css";
import { createButton, createDiv } from "./components/elements";
import chooseModesContainer from "./components/chooseModes";
import garageContent from "./pages/garage";
import winnersContent from "./pages/winners";

const chooseRoomContainer = createDiv("choose-room-container");
const toGarage = createButton("garage", "garage-button", "To garage");
const toWinners = createButton("winners", "winners-button", "To winners");
const garageArea = createDiv("garage-area");
const winnersArea = createDiv("winners-area");

toWinners.addEventListener("click", () => {
  if (document.contains(winnersArea)) {
    return;
  }
  document.body.removeChild(garageArea);
  document.body.removeChild(chooseModesContainer);
  document.body.appendChild(winnersArea);
});

toGarage.addEventListener("click", () => {
  if (document.contains(garageArea)) {
    return;
  }
  document.body.removeChild(winnersArea);
  document.body.appendChild(chooseModesContainer);
  document.body.appendChild(garageArea);
});

const prevNextButtons = createDiv("prev-next-buttons");
const prevButton = createButton("prev", "prev-button", "prev");
const nextButton = createButton("next", "next-button", "next");

chooseRoomContainer.append(toGarage, toWinners);
prevNextButtons.append(prevButton, nextButton);
document.body.append(
  chooseRoomContainer,
  chooseModesContainer,
  garageArea,
  prevNextButtons,
);
garageArea.append(garageContent);
winnersArea.append(winnersContent);

export default chooseRoomContainer;
