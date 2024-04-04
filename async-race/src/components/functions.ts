import { createText, createButton, createDiv } from "./elements";
import { svgCarElement, svgFlagElement } from "./svgElements";
import { Car } from "../types/interfaces";
import { state } from "../store/state";
import {
  createNewCarInGarage,
  updateCarAttributes,
  deleteCarFromGarage,
  getCarsPerPage,
  getWinners,
  getWinner,
} from "../api/api";
import { carNames, carModels } from "./nameAndModelCarArrays";
import { getRandomColor } from "../utils";
import {
  inputChooseCarModel,
  inputChooseCarColor,
  inputUpdateCarModel,
  inputUpdateCarColor,
} from "./modesArea";

export const garageContent = createDiv("garage-content");
export const garageArea = createDiv("garage-area");
garageArea.append(garageContent);

export const winnersContent = createDiv("winners-content");

export function createNewCar(car: Car) {
  const carAreaButtons = createDiv("car-area-buttons");
  const selectButton = createButton("select", "select-button", "select");
  const removeButton = createButton("remove", "remove-button", "remove");
  const modalText = createText("model-text", "");
  modalText.textContent = car.name;
  const carArea = createDiv("car-area");
  carArea.setAttribute("data-id", `${car.id}`);
  const actionButtons = createDiv("action-buttons");
  const aButton = createButton("a", "a-button", "A");
  const bButton = createButton("b", "b-button", "B");
  const road = createDiv("road");
  const svgCar = createDiv("car");
  svgCar.innerHTML = svgCarElement;
  svgCar.style.setProperty("--svg-fill-color", car.color);
  const finishFlag = createDiv("finish-flag");
  finishFlag.innerHTML = svgFlagElement;
  actionButtons.append(aButton, bButton);
  carAreaButtons.append(selectButton, removeButton, modalText);
  carArea.append(carAreaButtons, actionButtons, svgCar, road, finishFlag);
  garageContent.prepend(carArea);
}

export async function showGaragePage(): Promise<HTMLDivElement> {
  const carsResponse = await getCarsPerPage(state.page);
  garageArea.innerHTML = "";
  const garageText = createText(
    "garage-text",
    `Garage (${carsResponse.total})`,
  );
  state.totalCars = Number(carsResponse.total);
  const pagesGarageText = createText("pages", `Page #${state.page}`);
  garageArea.append(garageText, pagesGarageText);
  state.cars = carsResponse.cars;
  carsResponse.cars.forEach((car) => {
    createNewCar(car);
  });

  return garageContent;
}

export async function renderGarageContent() {
  garageContent.innerHTML = "";
  garageArea.innerHTML = "";
  await showGaragePage();
  garageArea.append(garageContent);
}

export async function createNewCarItem() {
  const newCar = await createNewCarInGarage({
    name: inputChooseCarModel.value,
    color: inputChooseCarColor.value,
  });
  createNewCar(newCar);
  inputChooseCarModel.value = "";
  inputChooseCarColor.value = "#000000";
  await renderGarageContent();
}

export function selectCar(event: Event) {
  const eventTarget = event.target as HTMLDivElement;
  if (eventTarget?.classList.contains("select-button")) {
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

export async function updateCar() {
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

export async function deleteCar(event: Event) {
  const eventTarget = event.target as HTMLDivElement;
  if (eventTarget?.classList.contains("remove-button")) {
    const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
    const carId = carElement?.dataset.id;
    if (carElement && carId) {
      state.selectedCar = state.cars.find((car) => String(car.id) === carId);
      if (state.selectedCar) {
        await deleteCarFromGarage(state.selectedCar.id);
        state.selectedCar = undefined;
        state.selectedCarArea = null;
        carElement.remove();
      }
    }
  }
  await renderGarageContent();
}

export function generateRandomCarData() {
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

export async function generateCars() {
  const carPromises = [];

  for (let i = 0; i < 100; i += 1) {
    const randomCar = generateRandomCarData();
    carPromises.unshift(createNewCarInGarage(randomCar));
  }

  await Promise.all(carPromises);
  await renderGarageContent();
}

async function getWinnersTable() {
  const winnersPerPage = await getWinner(1);
  const winnersText = createText(
    "winners-text",
    `Winners (${winnersPerPage.id})`,
  );
  const pagesWinnersText = createText("pages", `Page #1`);
  winnersContent.append(winnersText, pagesWinnersText);
}
getWinnersTable();

const svgCar = createDiv("car");
svgCar.classList.add("car_small");
svgCar.innerHTML = svgCarElement;
export async function createWinnersTable(): Promise<HTMLDivElement> {
  const winners = await getWinners();
  const { cars } = await getCarsPerPage();
  const table = document.createElement("table");
  table.classList.add("winners-table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  headerRow.classList.add("head-row-table");
  const headers = ["Number", "Car", "Name", "Wins", "Best time (seconds)"];

  headers.forEach((headerText) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerText;
    headerRow.append(headerCell);
  });
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement("tbody");
  for (let i = 0; i < winners.length; i += 1) {
    const row = document.createElement("tr");
    const cellNumber = document.createElement("td");
    cellNumber.textContent = `${i + 1}`;
    const cellCar = document.createElement("td");
    cellCar.append(svgCar);
    svgCar.style.setProperty("--svg-fill-color", cars[i].color);
    const cellName = document.createElement("td");
    cellName.textContent = cars[i].name;
    const cellWins = document.createElement("td");
    cellWins.textContent = winners[i].wins;
    const cellTime = document.createElement("td");
    cellTime.textContent = winners[i].time;

    cellNumber.classList.add("cell-table");
    cellCar.classList.add("cell-table");
    cellName.classList.add("cell-table");
    cellWins.classList.add("cell-table");
    cellTime.classList.add("cell-table");

    row.append(cellNumber, cellCar, cellName, cellWins, cellTime);
    tbody.append(row);
  }
  table.append(tbody);
  winnersContent.append(table);
  return winnersContent;
}

export default createNewCar;
