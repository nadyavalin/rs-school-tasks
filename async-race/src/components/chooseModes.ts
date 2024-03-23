import { createButton, createDiv, createInput } from "./elements";

const chooseModesContainer = createDiv("choose-modes-container");
const chooseContainer = createDiv("choose-container");
const inputChooseCarModel = createInput(
  "text",
  "model",
  "input-car-model",
  "Choose the model",
);
const inputChooseCarColor = createInput("color", "color", "input-color", "");
const createColoredCarButton = createButton(
  "color-button",
  "create-button",
  "create",
);

chooseContainer.append(
  inputChooseCarModel,
  inputChooseCarColor,
  createColoredCarButton,
);

const updateContainer = createDiv("update-container");
const inputUpdateCarModel = createInput(
  "text",
  "model",
  "input-car-model",
  "Choose the model",
);
const inputUpdateCarColor = createInput("color", "color", "input-color", "");
const updateColoredCarButton = createButton(
  "color-button",
  "update-button",
  "update",
);

updateContainer.append(
  inputUpdateCarModel,
  inputUpdateCarColor,
  updateColoredCarButton,
);

const raceButtonsContainer = createDiv("race-buttons-container");
const raceButton = createButton("race", "race-button", "race");
const resetButton = createButton("reset", "reset-button", "reset");
const generateCarsButton = createButton(
  "generate",
  "generate-button",
  "generate cars",
);
raceButtonsContainer.append(raceButton, resetButton, generateCarsButton);

document.body.append(chooseModesContainer);
chooseModesContainer.append(
  chooseContainer,
  updateContainer,
  raceButtonsContainer,
);

export default chooseModesContainer;
