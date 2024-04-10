import { createButton, createDiv, createLink, createText } from "src/components/elements";

export const infoArea = createDiv(["info-area"]);
const chatName = createText(["info-area__chat-name"], "Fun chat");
const infoText = createText(
  ["info-text"],
  "The application is designed to demonstrate the Fun Chat task as part of the RSSchool JS/FE 2023Q3 course!",
);
const githubName = createLink("https://github.com/nadyavalin", ["github-text"], "nadyavalin");
export const backButton = createButton("back-button", ["back-button"], "Come back");
infoArea.append(chatName, infoText, githubName, backButton);
