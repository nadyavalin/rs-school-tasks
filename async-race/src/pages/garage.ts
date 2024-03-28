import { createDiv, createText } from "../components/elements";
import { getCars, getCarsPerPage, deleteCarFromGarage } from "../api/api";
import { Car } from "../types/interfaces";
import { garageContent, createNewCar } from "../components/createNewCar";

export const garageArea = createDiv("garage-area");
garageArea.append(garageContent);

const carsPerPage = await getCarsPerPage("1");
export const garageText = createText(
  "garage-text",
  `Garage (${carsPerPage.total})`,
);
const pagesGarageText = createText("pages", `Page #1`);

garageArea.append(garageText, pagesGarageText);

export async function getGaragePage(): Promise<HTMLDivElement> {
  const cars = await getCars();
  cars.forEach((car: Car) => {
    createNewCar(`${car.name}`, `${car.color}`);
  });

  garageContent.addEventListener("click", async (event) => {
    const eventTarget = event.target as HTMLDivElement;
    if (eventTarget) {
      if (eventTarget.classList.contains("remove-button")) {
        const carElement = eventTarget.closest(".car-area") as HTMLDivElement;
        await deleteCarFromGarage(cars.id);
        carElement.remove();
      }
    }
  });

  return garageContent;
}
