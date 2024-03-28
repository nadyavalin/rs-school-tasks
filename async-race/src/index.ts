import "./index.css";
import { createButton, createDiv } from "./components/elements";
import chooseModesContainer from "./components/createNewCarsButtons";
import { getGaragePage, garageArea } from "./pages/garage";
import { winnersContent, createWinnersTable } from "./pages/winners";

const chooseRoomContainer = createDiv("choose-room-container");
const toGarage = createButton("garage", "garage-button", "To garage");
const toWinners = createButton("winners", "winners-button", "To winners");
chooseRoomContainer.append(toGarage, toWinners);

const prevNextButtons = createDiv("prev-next-buttons");
const prevButton = createButton("prev", "prev-button", "prev");
const nextButton = createButton("next", "next-button", "next");
prevNextButtons.append(prevButton, nextButton);

let winnersTable: HTMLDivElement;
let garagePage: HTMLDivElement;

async function loadGaragePage() {
  garagePage = await getGaragePage();
  garageArea.append(garagePage);
  document.body.append(
    chooseRoomContainer,
    chooseModesContainer,
    garageArea,
    prevNextButtons,
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadGaragePage);
} else {
  loadGaragePage();
}

toWinners.addEventListener("click", async () => {
  if (document.contains(winnersContent)) {
    return;
  }
  if (!winnersTable) {
    winnersTable = await createWinnersTable();
  }
  document.body.removeChild(chooseModesContainer);
  document.body.removeChild(garageArea);
  document.body.append(winnersTable, prevNextButtons);
});

toGarage.addEventListener("click", async () => {
  if (document.contains(garageArea)) {
    return;
  }
  if (!garagePage) {
    garagePage = await getGaragePage();
  }
  garageArea.append(garagePage);
  document.body.removeChild(winnersContent);
  document.body.append(chooseModesContainer, garageArea, prevNextButtons);
});

export default chooseRoomContainer;
