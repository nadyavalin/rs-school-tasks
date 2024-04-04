import { createDiv, createText } from "../components/elements";
import { getCarsPerPage } from "../api/api";
import { garageContent, createNewCar } from "../components/createNewCar";
import { state } from "../store/state";

export const garageArea = createDiv("garage-area");
garageArea.append(garageContent);

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

export default showGaragePage;
