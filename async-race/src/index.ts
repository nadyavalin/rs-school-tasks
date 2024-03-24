import "./index.css";
import { createButton, createDiv } from "./components/elements";
import chooseModesContainer from "./components/chooseModes";
import garageContent from "./pages/garage";
import winnersContent from "./pages/winners";

const chooseRoomContainer = createDiv("choose-room-container");
const toGarage = createButton("garage", "garage-button", "To garage");
const toWinners = createButton("winners", "winners-button", "To winners");

toWinners.addEventListener("click", () => {
  if (document.contains(winnersContent)) {
    return;
  }
  document.body.removeChild(garageContent);
  document.body.removeChild(chooseModesContainer);
  document.body.append(winnersContent);
});

toGarage.addEventListener("click", () => {
  if (document.contains(garageContent)) {
    return;
  }
  document.body.removeChild(winnersContent);
  document.body.append(chooseModesContainer);
  document.body.append(garageContent);
});

const prevNextButtons = createDiv("prev-next-buttons");
const prevButton = createButton("prev", "prev-button", "prev");
const nextButton = createButton("next", "next-button", "next");

chooseRoomContainer.append(toGarage, toWinners);
prevNextButtons.append(prevButton, nextButton);
document.body.append(
  chooseRoomContainer,
  chooseModesContainer,
  prevNextButtons,
);

document.body.append(garageContent);
document.body.removeChild(winnersContent);

export default chooseRoomContainer;
