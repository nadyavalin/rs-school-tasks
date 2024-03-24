import { createDiv, createText, createButton } from "../components/elements";
import { carArea, modelText } from "../components/carArea";

const garageContent = createDiv("garage-content");
const garageText = createText("garage-text", `Garage ()`);
const pagesGarageText = createText("pages", `Page #`);
const carAreaButtons = createDiv("car-area-buttons");
const selectButton = createButton("select", "select-button", "select");
const removeButton = createButton("remove", "remove-button", "remove");

carAreaButtons.append(selectButton, removeButton, modelText);
garageContent.append(garageText, pagesGarageText, carArea);

export default garageContent;
