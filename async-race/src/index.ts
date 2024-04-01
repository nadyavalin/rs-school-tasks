import "./index.css";
import { createButton, createDiv } from "./components/elements";
import {
  chooseModesContainer,
  renderGarageContent,
} from "./components/carButtons";
import { showGaragePage, garageArea } from "./pages/garage";
import { winnersContent, createWinnersTable } from "./pages/winners";
import { state } from "./store/state";
import {
  prevNextButtons,
  prevButton,
  nextButton,
} from "./components/areaButtons";

const chooseRoomContainer = createDiv("choose-room-container");
const toGarage = createButton("garage", "garage-button", "To garage");
const toWinners = createButton("winners", "winners-button", "To winners");
chooseRoomContainer.append(toGarage, toWinners);

let winnersTable: HTMLDivElement;
let garagePage: HTMLDivElement;

async function loadGaragePage() {
  garagePage = await showGaragePage();
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
  prevButton.classList.add("prev-button_disabled");
  nextButton.classList.add("next-button_disabled");
});

toGarage.addEventListener("click", async () => {
  nextButton.classList.remove("next-button_disabled");
  if (document.contains(garageArea)) {
    return;
  }

  state.page = 1;
  await renderGarageContent();

  if (!garagePage) {
    garagePage = await showGaragePage();
  }
  garageArea.append(garagePage);
  document.body.removeChild(winnersContent);
  document.body.append(chooseModesContainer, garageArea, prevNextButtons);
});

prevButton.classList.add("prev-button_disabled");
prevButton.addEventListener("click", () => {
  if (state.page > 1) {
    state.page -= 1;
    prevButton.classList.remove("prev-button_disabled");
    nextButton.classList.remove("next-button_disabled");
  }
  if (state.page === 1) {
    prevButton.classList.add("prev-button_disabled");
  }
  renderGarageContent();
});

if (state.totalCars <= 7) {
  nextButton.classList.add("next-button_disabled");
}

nextButton.addEventListener("click", async () => {
  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);

  if (state.page < totalPages) {
    state.page += 1;
    prevButton.classList.remove("prev-button_disabled");
  }
  if (state.page === totalPages) {
    nextButton.classList.add("next-button_disabled");
  }
  await renderGarageContent();
});

export default chooseRoomContainer;
