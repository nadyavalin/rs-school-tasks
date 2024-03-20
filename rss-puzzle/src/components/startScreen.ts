import "../index.css";
import container from "./container";
import { createText, createButton, createDiv } from "./elements";
import { getUserInfo } from "./localStorage";
import gameArea from "./gamePage";

export default function createStartScreen() {
  const startScreenPage = document.createElement("div");
  startScreenPage.classList.add("start-screen-page");

  const userData = getUserInfo();
  const greetText = `Hello, ${userData.firstName} ${userData.surname}!`;
  const greet = createText("greet-text", greetText);
  const title = createText("title", "English puzzle");
  const imagePuzzle = createDiv("image-puzzle");
  const description1 = createText(
    "start-text",
    "Click on words, collect phrases.",
  );
  const description2 = createText(
    "start-text",
    "Words can be drag and drop. Select hints in the menu.",
  );
  const startButton = createButton("start", "start-button", "Start");

  startButton.addEventListener("click", () => {
    startScreenPage.remove();
    container.append(gameArea);
  });

  startScreenPage.append(
    greet,
    title,
    imagePuzzle,
    description1,
    description2,
    startButton,
  );

  return startScreenPage;
}
