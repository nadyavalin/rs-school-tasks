import { createButton, createDiv, createText } from "./elements";

const carArea = createDiv("car-area");
const carAreaButtons = createDiv("car-area-buttons");
const selectButton = createButton("select", "select-button", "select");
const removeButton = createButton("remove", "remove-button", "remove");
const modelText = createText("model-text", `Cherry`);

const actionButtons = createDiv("action-buttons");
const aButton = createButton("a", "a-button", "A");
const bButton = createButton("b", "b-button", "B");

carAreaButtons.append(selectButton, removeButton, modelText);
actionButtons.append(aButton, bButton);
carArea.append(carAreaButtons, actionButtons);

export default carArea;
