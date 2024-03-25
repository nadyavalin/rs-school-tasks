import "./index.css";
import { createButton, createDiv } from "./components/elements";
import chooseModesContainer from "./components/createNewCarsButtons";
import { garageArea } from "./pages/garage";
import winnersContent from "./pages/winners";

const chooseRoomContainer = createDiv("choose-room-container");
const toGarage = createButton("garage", "garage-button", "To garage");
const toWinners = createButton("winners", "winners-button", "To winners");

const prevNextButtons = createDiv("prev-next-buttons");
const prevButton = createButton("prev", "prev-button", "prev");
const nextButton = createButton("next", "next-button", "next");
prevNextButtons.append(prevButton, nextButton);

toWinners.addEventListener("click", () => {
  if (document.contains(winnersContent)) {
    return;
  }
  document.body.removeChild(garageArea);
  document.body.removeChild(chooseModesContainer);
  document.body.append(winnersContent, prevNextButtons);
});

toGarage.addEventListener("click", () => {
  if (document.contains(garageArea)) {
    return;
  }
  document.body.removeChild(winnersContent);
  document.body.append(chooseModesContainer);
  document.body.append(garageArea, prevNextButtons);
});

chooseRoomContainer.append(toGarage, toWinners);
document.body.append(chooseRoomContainer, chooseModesContainer);
document.body.append(garageArea, prevNextButtons);
document.body.removeChild(winnersContent);

export default chooseRoomContainer;
