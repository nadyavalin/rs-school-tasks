import "../index.css";
import { createText, createButton } from "./elements";

const startScreenPage = document.createElement("div");
startScreenPage.classList.add("start-screen-page");

const title = createText("title", "");
const description1 = createText("greet-text", "");
const description2 = createText("greet-text", "");
const startButton = createButton("start", "start-button", "Start");

startScreenPage.append(title, description1, description2, startButton);

export default startScreenPage;
