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
        console.log("Selected Car:", state.selectedCar);
        inputUpdateCarModel.value = state.selectedCar?.name ?? "";
        inputUpdateCarColor.value = state.selectedCar?.color ?? "";
      }
    }
  }
});

updateCarButton.addEventListener("click", async () => {
  if (state.selectedCar) {
    await updateCarAttributes({
      name: inputUpdateCarModel.value,
      color: inputUpdateCarColor.value,
      id: state.selectedCar.id,
    });
    const cars = await getGaragePage();
    state.selectedCar.name = cars.name;
    state.selectedCar.color = cars.color;
    state.selectedCar.id = cars.id;
  }
});

// function changeCarName() {
//   const inputCarName = inputChooseCarModel.value;
//   if (modalText) {
//     modalText.textContent = inputCarName;
//   }
//   if (carAreaButtons) {
//     if (modalText && !carAreaButtons.contains(modalText)) {
//       carAreaButtons.append(modalText);
//     }
//   }
// }

// function changeColor() {
//   if (svgCar) {
//     svgCar.style.setProperty("--svg-fill-color", inputChooseCarColor.value);
//   }
// }

export default chooseModesContainer;
