import { createDiv, createText } from "../components/elements";
import { getCarsPerPage } from "../api/api";
import { garageContent, createNewCar } from "../components/createNewCar";
import { state } from "../store/state";

export const garageArea = createDiv("garage-area");
garageArea.append(garageContent);

export async function getGaragePage(): Promise<HTMLDivElement> {
  const carsResponse = await getCarsPerPage("1");
  const garageText = createText(
    "garage-text",
    `Garage (${carsResponse.total})`,
  );
  const pagesGarageText = createText("pages", `Page #1`);
  garageArea.append(garageText, pagesGarageText);
  state.cars = carsResponse.cars;

  carsResponse.cars.forEach((car) => {
    createNewCar(car);
  });

  return garageContent;
}

export default getGaragePage;
