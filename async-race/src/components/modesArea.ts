import { state } from "src/store/state";
import { generateRandomCarData } from "src/utils/utils";
import { createNewCarInGarage, updateCarAttributes } from "src/api/api";
import { createButton, createDiv, createInput } from "./elements";
import { createNewCar, renderGarageContent } from "./functions";

const inputChooseCarModel = createInput("text", "model", "input-car-model", "Choose the model");
const inputChooseCarColor = createInput("color", "color", "input-color", "");
const inputUpdateCarModel = createInput("text", "model", "input-car-model", "Choose the model");
const inputUpdateCarColor = createInput("color", "color", "input-color", "");
export const chooseModesContainer = createDiv("choose-modes-container");
const chooseContainer = createDiv("choose-container");
const createCarButton = createButton("color-button", ["create-button"], "create");
const updateContainer = createDiv("update-container");
const updateCarButton = createButton("color-button", ["update-button"], "update");
const raceButtonsContainer = createDiv("race-buttons-container");
const raceButton = createButton("race", ["race-button"], "race");
const resetButton = createButton("reset", ["reset-button"], "reset");
const generateCarsButton = createButton("generate", ["generate-button"], "generate cars");

state.components.inputUpdateCarModel = inputUpdateCarModel;
state.components.inputUpdateCarColor = inputUpdateCarColor;

chooseContainer.append(inputChooseCarModel, inputChooseCarColor, createCarButton);
updateContainer.append(inputUpdateCarModel, inputUpdateCarColor, updateCarButton);
raceButtonsContainer.append(raceButton, resetButton, generateCarsButton);
chooseModesContainer.append(chooseContainer, updateContainer, raceButtonsContainer);

document.body.append(chooseModesContainer);

async function createNewCarItem() {
  const newCar = await createNewCarInGarage({
    name: inputChooseCarModel.value,
    color: inputChooseCarColor.value,
  });
  createNewCar(newCar);
  inputChooseCarModel.value = "";
  inputChooseCarColor.value = "#000000";
  await renderGarageContent();
}

async function updateCar() {
  if (state.selectedCar && state.selectedCarArea) {
    const updatedCarData = {
      name: inputUpdateCarModel.value,
      color: inputUpdateCarColor.value,
      id: state.selectedCar.id,
    };
    await updateCarAttributes(updatedCarData);

    if (updatedCarData) {
      const newName = state.selectedCarArea.querySelector(".model-text") as HTMLElement | null;
      const newColor = state.selectedCarArea.querySelector(".car") as HTMLElement | null;

      if (newName) {
        newName.innerText = updatedCarData.name;
        state.selectedCar.name = updatedCarData.name;
        inputUpdateCarModel.value = "";
      }
      if (newColor) {
        newColor.removeAttribute("style");
        newColor.style.fill = updatedCarData.color;
        state.selectedCar.color = updatedCarData.color;
        inputUpdateCarColor.value = "#000000";
      }
    }
  }
  await renderGarageContent();
}

async function generateCars() {
  const carPromises = [];

  for (let i = 0; i < 100; i += 1) {
    const randomCar = generateRandomCarData();
    carPromises.unshift(createNewCarInGarage(randomCar));
  }

  await Promise.all(carPromises);
  await renderGarageContent();
  state.components.nextButton?.classList.remove("next-button_disabled");
}

createCarButton.addEventListener("click", createNewCarItem);
updateCarButton.addEventListener("click", updateCar);
generateCarsButton.addEventListener("click", generateCars);

export default chooseModesContainer;
