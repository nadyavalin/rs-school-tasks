import { createButton, createDiv, createInput } from "./elements";
import {
  createNewCarInGarage,
  updateCarAttributes,
  deleteCarFromGarage,
} from "../api/api";
import { garageContent, createNewCar } from "./createNewCar";
import { garageArea, showGaragePage } from "../pages/garage";
import { state } from "../store/state";
import { carNames, carModels } from "./nameAndModelCarArrays";
import { nextButton } from "./contentButtons";

export const chooseModesContainer = createDiv("choose-modes-container");
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

export async function renderGarageContent() {
  garageContent.innerHTML = "";
  garageArea.innerHTML = "";
  await showGaragePage();
  garageArea.append(garageContent);
}

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

createCarButton.addEventListener("click", async () => {
  await createNewCarItem();
  if (state.totalCars > 6) {
    nextButton.classList.remove("next-button_disabled");
  }
});

function selectCar(event: Event) {
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
}

garageContent.addEventListener("click", selectCar);

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
  await renderGarageContent();
}

updateCarButton.addEventListener("click", updateCar);

async function deleteCar(event: Event) {
  const eventTarget = event.target as HTMLDivElement;
  if (eventTarget) {
    if (eventTarget.classList.contains("remove-button")) {
      const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
      const carId = carElement?.dataset.id;
      if (carElement && carId) {
        state.selectedCar = state.cars.find((car) => String(car.id) === carId);
        if (state.selectedCar) {
          await deleteCarFromGarage(state.selectedCar.id);
          carElement.remove();
        }
      }
    }
  }
  await renderGarageContent();
}

garageContent.addEventListener("click", deleteCar);

function getRandomColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  return randomColor;
}

function generateRandomCarData() {
  const randomCarIndex = Math.floor(Math.random() * carNames.length);
  const randomCarName = carNames[randomCarIndex];

  const randomCarModelIndex = Math.floor(
    Math.random() * carModels[randomCarIndex].length,
  );
  const randomCarModel = carModels[randomCarIndex][randomCarModelIndex];

  return {
    name: `${randomCarName} ${randomCarModel}`,
    color: getRandomColor(),
  };
}

async function generateCars() {
  const carPromises = [];

  for (let i = 0; i < 100; i += 1) {
    const randomCar = generateRandomCarData();
    carPromises.unshift(createNewCarInGarage(randomCar));
  }

  await Promise.all(carPromises);
  await renderGarageContent();
}

generateCarsButton.addEventListener("click", async () => {
  nextButton.classList.remove("next-button_disabled");
  await generateCars();
});

export default chooseModesContainer;
