import "../index.css";
import { createText, createImage, createButton } from "./elements";

const startScreenPage = document.createElement("div");
startScreenPage.classList.add("start-screen-page");

const title = createText("title", "English puzzle");
const imagePuzzle = createImage(
  "../public/img/puzzle.png",
  "Puzzle",
  "image-puzzle",
);
const description1 = createText(
  "greet-text",
  "Click on words, collect phrases.",
);
const description2 = createText(
  "greet-text",
  "Words can be drag and drop. Select hints in the menu.",
);
const startButton = createButton("start", "start-button", "Start");

startScreenPage.append(
  title,
  imagePuzzle,
  description1,
  description2,
  startButton,
);

export default startScreenPage;
