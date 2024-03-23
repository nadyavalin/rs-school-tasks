import { createDiv, createText, createButton } from "../components/elements";
import carArea from "../components/carArea";

const garageContent = createDiv("garage-content");
const garageText = createText("garage-text", `Garage ()`);
const pagesText = createText("pages", `Page #`);
const carAreaButtons = createDiv("car-area-buttons");
const selectButton = createButton("select", "select-button", "select");
const removeButton = createButton("remove", "remove-button", "remove");
const modelText = createText("model-text", `Cherry`);

carAreaButtons.append(selectButton, removeButton, modelText);
garageContent.append(garageText, pagesText, carArea);

export default garageContent;
