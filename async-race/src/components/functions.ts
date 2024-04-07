import { createText, createButton, createDiv } from "./elements";
import { svgCarElement, svgFlagElement } from "./svgElements";
import { Car } from "../types/interfaces";
import { state } from "../store/state";
import { getCarsPerPage, getWinners } from "../api/api";
import { deleteCar, selectCar } from "./carButtons";

export const garageContent = createDiv("garage-content");
export const garageArea = createDiv("garage-area");
garageArea.append(garageContent);

export const winnersContent = createDiv("winners-content");

export function createNewCar(car: Car) {
  const carAreaButtons = createDiv("car-area-buttons");
  const selectButton = createButton("select", ["select-button"], "select");
  const removeButton = createButton("remove", ["remove-button"], "remove");
  const modalText = createText("model-text", "");
  modalText.textContent = car.name;
  const carArea = createDiv("car-area");
  carArea.setAttribute("data-id", `${car.id}`);
  const actionButtons = createDiv("action-buttons");
  const aButton = createButton("a", ["a-button"], "A");
  const bButton = createButton("b", ["b-button"], "B");
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
  if (state.totalCars > 7) {
    state.components.nextButton?.classList.remove("next-button_disabled");
  }
}

export async function showGaragePage(): Promise<HTMLDivElement> {
  const carsResponse = await getCarsPerPage(state.page);
  const garageText = createText("garage-text", `Garage (${carsResponse.total})`);
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

  const totalPages = Math.ceil(state.totalCars / state.carsPerPage);
  if (state.totalCars <= 7 || state.page === totalPages) {
    state.components.nextButton?.classList.add("next-button_disabled");
  }
  
  garageArea.append(garageContent);
}

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

garageContent.addEventListener("click", async (event) => {
  const eventTarget = event.target as HTMLDivElement;
  if (eventTarget?.classList.contains("remove-button")) {
    await deleteCar(eventTarget);
    await renderGarageContent();
  } else if (eventTarget?.classList.contains("select-button")) {
    selectCar(eventTarget);
  }
});
