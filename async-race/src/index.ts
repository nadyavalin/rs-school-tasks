import "./index.css";
import { createButton, createDiv } from "./components/elements";
import chooseModesContainer from "./components/chooseModes";
import garageText from "./pages/garage";
import winnersText from "./pages/winners";

const chooseRoomContainer = createDiv("choose-room-container");
const toGarage = createButton("garage", "garage-button", "To garage");
const toWinners = createButton("winners", "winners-button", "To winners");
const garageArea = createDiv("garage-area");
const winnersArea = createDiv("winners-area");

chooseRoomContainer.append(toGarage, toWinners);
document.body.append(chooseRoomContainer, chooseModesContainer, garageArea);
garageArea.append(garageText);
winnersArea.append(winnersText);

toWinners.addEventListener("click", () => {
  if (document.contains(winnersArea)) {
    return;
  }
  document.body.removeChild(garageArea);
  document.body.appendChild(winnersArea);
});

toGarage.addEventListener("click", () => {
  if (document.contains(garageArea)) {
    return;
  }
  document.body.removeChild(winnersArea);
  document.body.appendChild(garageArea);
});

export default chooseRoomContainer;
