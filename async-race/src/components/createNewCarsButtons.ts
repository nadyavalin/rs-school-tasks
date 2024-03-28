import { createButton, createDiv, createInput } from "./elements";
import { createNewCarInGarage } from "../api/api";
import { garageContent, createNewCar } from "./createNewCar";
import { garageArea } from "../pages/garage";

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

let selectedCar;

async function createNewCarItem() {
  createNewCar(inputChooseCarModel.value, inputChooseCarColor.value);
  const newCar = await createNewCarInGarage({
    name: inputChooseCarModel.value,
    color: inputChooseCarColor.value,
  });

  garageContent.addEventListener("click", async (event) => {
    const eventTarget = event.target as HTMLDivElement;
    if (eventTarget) {
      const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
      carElement.setAttribute("data-id", `${newCar.id}`);
      if (carElement) {
        garageContent.prepend(carElement);
      }
    }
  });
  garageArea.append(garageContent);
}

createCarButton.addEventListener("click", createNewCarItem);

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

garageContent.addEventListener("click", (event) => {
  const eventTarget = event.target as HTMLDivElement;
  if (eventTarget) {
    if (eventTarget.classList.contains("select-button")) {
      const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
      console.log(carElement);
      if (carElement && carElement.dataset.id) {
        const carId = carElement.dataset.id;
        selectedCar = carId;
        console.log("Selected Car ID:", selectedCar);
      }
    }
  }
});

// updateCarButton.addEventListener("click", async () => {
//   await updateCarAttributes({
//     name: inputUpdateCarModel.value,
//     color: inputUpdateCarColor.value,
//     id: newCar.id,
//   });
//   console.log(newCar.id);
//   changeCarName();
//   changeColor();
// });

export default chooseModesContainer;
