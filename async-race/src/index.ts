import "./index.css";
import { chooseModesContainer } from "./components/carButtons";
import {
  showGaragePage,
  garageArea,
  winnersContent,
  createWinnersTable,
} from "./components/functions";
import { state } from "./store/state";
import {
  chooseRoomContainer,
  toGarage,
  toWinners,
  prevNextButtons,
  prevButton,
  nextButton,
} from "./components/contentButtons";

let winnersTable: HTMLDivElement;
let garagePage: HTMLDivElement;

async function loadGaragePage() {
  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  garagePage = await showGaragePage();
  garageArea.append(garagePage);
  document.body.append(
    chooseRoomContainer,
    chooseModesContainer,
    garageArea,
    prevNextButtons,
  );

  if (state.page === 1) {
    prevButton.classList.add("prev-button_disabled");
  }

  if (state.page === totalPages || state.totalCars <= 7) {
    nextButton.classList.add("next-button_disabled");
  }
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

  // If you will need to return to the first page
  // state.page = 1;
  // await renderGarageContent();

  if (!garagePage) {
    garagePage = await showGaragePage();
  }
  garageArea.append(garagePage);
  document.body.removeChild(winnersContent);
  document.body.append(chooseModesContainer, garageArea, prevNextButtons);
});

export default chooseRoomContainer;
