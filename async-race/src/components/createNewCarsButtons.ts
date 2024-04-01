import { createButton, createDiv, createInput } from "./elements";
import { createNewCarInGarage, updateCarAttributes } from "../api/api";
import { garageContent, createNewCar } from "./createNewCar";
import { garageArea } from "../pages/garage";
import { state } from "../store/state";

const chooseModesContainer = createDiv("choose-modes-container");
const chooseContainer = createDiv("choose-container");
export const inputChooseCarModel = createInput(
  "text",
  "model",
  "input-car-model",
  "Choose the model",
);

const inputChooseCarColor = createInput("color", "color", "input-color", "");
const createCarButton = createButton("color-button", "create-button", "create");

chooseContainer.append(
  inputChooseCarModel,
  inputChooseCarColor,
  createCarButton,
);

const updateContainer = createDiv("update-container");
const inputUpdateCarModel = createInput(
  "text",
  "model",
  "input-car-model",
  "Choose the model",
);
const inputUpdateCarColor = createInput("color", "color", "input-color", "");
const updateCarButton = createButton("color-button", "update-button", "update");

updateContainer.append(
  inputUpdateCarModel,
  inputUpdateCarColor,
  updateCarButton,
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

async function createNewCarItem() {
  const newCar = await createNewCarInGarage({
    name: inputChooseCarModel.value,
    color: inputChooseCarColor.value,
  });
  createNewCar(newCar);
  inputChooseCarModel.value = "";
  inputChooseCarColor.value = "#000000";
  garageArea.append(garageContent);
}

createCarButton.addEventListener("click", createNewCarItem);

garageContent.addEventListener("click", (event) => {
  const eventTarget = event.target as HTMLDivElement;
  if (eventTarget) {
    if (eventTarget.classList.contains("select-button")) {
      const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
      if (carElement && carElement.dataset.id) {
        const carId = carElement.dataset.id;
        state.selectedCar = state.cars.find((car) => String(car.id) === carId);
        state.selectedCarArea = carElement;
        inputUpdateCarModel.value = state.selectedCar?.name ?? "";
        inputUpdateCarColor.value = state.selectedCar?.color ?? "";
      }
    }
  }
});

async function updateCar() {
  if (state.selectedCar && state.selectedCarArea) {
    const updatedCarData = {
      name: inputUpdateCarModel.value,
      color: inputUpdateCarColor.value,
      id: state.selectedCar.id,
    };
    await updateCarAttributes(updatedCarData);

    if (updatedCarData) {
      const newName = state.selectedCarArea.querySelector(
        ".model-text",
      ) as HTMLElement | null;
      const newColor = state.selectedCarArea.querySelector(
        ".car",
      ) as HTMLElement | null;

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
}

updateCarButton.addEventListener("click", updateCar);

export default chooseModesContainer;
