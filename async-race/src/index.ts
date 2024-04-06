import "./index.css";
import { showGaragePage, garageArea } from "./components/functions";
import { state } from "./store/state";
import { chooseRoomContainer, prevNextButtons, prevButton, nextButton } from "./components/contentButtons";
import { chooseModesContainer } from "./components/modesArea";

async function loadGaragePage() {
  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  const garagePage = await showGaragePage();
  garageArea.append(garagePage);
  document.body.append(chooseRoomContainer, chooseModesContainer, garageArea, prevNextButtons);

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
