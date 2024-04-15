import { createButton, createDiv, createElement, createInput, createLink, createSpan, createText } from "src/components/elements";
import { SendMessagePayloadResponse } from "src/types/types";
import { infoArea } from "./info";

export const header = createElement("header", ["header"]);
export const main = createElement("main", ["main"]);
export const footer = createElement("footer", ["footer"]);

const leftSide = createDiv(["left-side"]);
const search = createDiv(["left-side__search"]);
export const membersList = createElement("ul", ["left-side__member-list"]);

const rightSide = createDiv(["right-side"]);
const statusArea = createDiv(["right-side__status-area"]);
const chatArea = createDiv(["right-side__chat-area"]);
const sendMessageArea = createDiv(["right-side__send-message-area"]);

leftSide.append(search, membersList);
rightSide.append(statusArea, chatArea, sendMessageArea);
main.append(leftSide, rightSide);

const headerText = createDiv(["header-text"]);

export const userName = createText(["user-name"], ``);
const chatName = createText(["chat-name"], "Fun Chat");
const headerButtons = createDiv(["header-buttons"]);
export const logoutButton = createButton("logout", ["logout-button"], "logout");
const infoButton = createButton("info", ["info-button"], "info");
headerButtons.append(logoutButton, infoButton);
headerText.append(userName, chatName, headerButtons);
header.append(headerText);

const searchInput = createInput("search-input", "text", ["search-input"], "Search...");
const searchButton = createButton("search-button", ["search-button"], "Search");
search.append(searchInput, searchButton);

const choosedUserFromList = createText(["choosed-user"], ``);
const userStatus = createText(["user-status"], `on line`);
statusArea.append(choosedUserFromList, userStatus);

const chatAreaText = createText(["chat-area__text"], "Write your first message...");
chatArea.append(chatAreaText);

const messageInput = createInput("send-message-input", "text", ["send-message-input"], "Message...");
const sendButton = createButton("send-button", ["send-button"], "send");
sendMessageArea.append(messageInput, sendButton);

const footerText = createDiv(["footer-text"]);
const rsschool = createLink("https://rs.school/courses", ["rsschool-text"], "RSSchool");
const githubName = createLink("https://github.com/nadyavalin", ["github-text"], "nadyavalin");
const year = createText(["year-text"], "2024");
footerText.append(rsschool, githubName, year);
footer.append(footerText);

infoButton.addEventListener("click", () => {
  document.body.removeChild(header);
  document.body.removeChild(main);
  document.body.removeChild(footer);
  document.body.append(infoArea);
});

export function sendMessageToUser(payload: SendMessagePayloadResponse) {
  if (messageInput.value.trim() !== "") {
    messageInput.value = payload.text;
  }
  const messageArea = createDiv(["message-area"]);
  const messageTopArea = createDiv(["message-top-area"]);
  const messageFrom = createSpan(["message-from"], `${payload.from}`);
  const messageDate = createSpan(["message-date"], `${payload.datetime}`);
  const messageText = createText(["message-text"], `${messageInput.value}`);
  const messageStatus = createSpan(["message-status"], `${payload.status}`);
  messageTopArea.append(messageFrom, messageDate);
  messageArea.append(messageTopArea, messageText, messageStatus);
  chatAreaText.append(messageArea);
}

membersList.addEventListener("change", (event) => {
  const userItem = event.target as HTMLLIElement;
  if (membersList.classList.contains('left-side__member-list') && userItem.nodeName === "li") {
    userItem.append(choosedUserFromList);
  }
});

sendButton.addEventListener("click", () => {
  const payload: SendMessagePayloadResponse = {
    id: "",
    from: "",
    to: "smb",
    text: "text",
    datetime: Date.now(),
    status: {
      isDelivered: false,
      isReaded: false,
      isEdited: false,
    },
  };

  sendMessageToUser(payload);
});
