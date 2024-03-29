import { createText, createButton, createDiv } from "./elements";
import { svgCarElement, svgFlagElement } from "./svgElements";
import { Car } from "../types/interfaces";

export const garageContent = createDiv("garage-content");

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
  garageContent.append(carArea);
}

export default createNewCar;
