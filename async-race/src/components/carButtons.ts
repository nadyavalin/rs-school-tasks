import { createButton, createDiv } from "./elements";
import {
  garageContent,
  createNewCarItem,
  selectCar,
  updateCar,
  deleteCar,
  generateCars,
} from "./functions";
import { state } from "../store/state";
import { nextButton } from "./contentButtons";
import {
  inputChooseCarModel,
  inputChooseCarColor,
  inputUpdateCarModel,
  inputUpdateCarColor,
} from "./modesArea";

export const chooseModesContainer = createDiv("choose-modes-container");
export const chooseContainer = createDiv("choose-container");

export const createCarButton = createButton(
  "color-button",
  "create-button",
  "create",
);

chooseContainer.append(
  inputChooseCarModel,
  inputChooseCarColor,
  createCarButton,
);

export const updateContainer = createDiv("update-container");

export const updateCarButton = createButton(
  "color-button",
  "update-button",
  "update",
);

updateContainer.append(
  inputUpdateCarModel,
  inputUpdateCarColor,
  updateCarButton,
);

export const raceButtonsContainer = createDiv("race-buttons-container");
export const raceButton = createButton("race", "race-button", "race");
export const resetButton = createButton("reset", "reset-button", "reset");
export const generateCarsButton = createButton(
  "generate",
  "generate-button",
  "generate cars",
);
raceButtonsContainer.append(raceButton, resetButton, generateCarsButton);

chooseModesContainer.append(
  chooseContainer,
  updateContainer,
  raceButtonsContainer,
);

document.body.append(chooseModesContainer);

createCarButton.addEventListener("click", async () => {
  await createNewCarItem();
  if (state.totalCars > 7) {
    nextButton.classList.remove("next-button_disabled");
  }
});

garageContent.addEventListener("click", selectCar);

updateCarButton.addEventListener("click", updateCar);

garageContent.addEventListener("click", deleteCar);

generateCarsButton.addEventListener("click", async () => {
  nextButton.classList.remove("next-button_disabled");
  await generateCars();
});

export default chooseModesContainer;
