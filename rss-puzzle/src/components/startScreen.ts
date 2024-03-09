import "../index.css";
import { createText, createImage, createButton } from "./elements";
import { showDataUser } from "./localStorage";

const startScreenPage = document.createElement("div");
startScreenPage.classList.add("start-screen-page");

const userData = showDataUser();
const greetText = userData
  ? `Hello, ${userData.firstName} ${userData.surname}!`
  : "";
const greet = createText("greet-text", greetText);
const title = createText("title", "English puzzle");
const imagePuzzle = createImage(
  "../public/img/puzzle.png",
  "Puzzle",
  "image-puzzle",
);
const description1 = createText(
  "start-text",
  "Click on words, collect phrases.",
);
const description2 = createText(
  "start-text",
  "Words can be drag and drop. Select hints in the menu.",
);
const startButton = createButton("start", "start-button", "Start");

startScreenPage.append(
  greet,
  title,
  imagePuzzle,
  description1,
  description2,
  startButton,
);

export default startScreenPage;
