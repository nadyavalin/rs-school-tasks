import { createButton, createDiv, createElement, createInput, createLink, createText } from "src/components/elements";

export const header = createElement("header", ["header"]);
export const main = createElement("main", ["main"]);
export const footer = createElement("footer", ["footer"]);

const leftSide = createDiv(["left-side"]);
const search = createDiv(["left-side__search"]);
const membersList = createDiv(["left-side__member-list"]);

const rightSide = createDiv(["right-side"]);
const statusArea = createDiv(["right-side__status-area"]);
const chatArea = createDiv(["right-side__chat-area"]);
const sendMessageArea = createDiv(["right-side__send-message-area"]);

leftSide.append(search, membersList);
rightSide.append(statusArea, chatArea, sendMessageArea);
main.append(leftSide, rightSide);

const headerText = createDiv(["header-text"]);
const userName = createText(["user-name"], `User: __`);
const chatName = createText(["chat-name"], "Fun Chat");
const headerButtons = createDiv(["header-buttons"]);
const logoutButton = createButton("logout", ["logout-button"], "logout");
const infoButton = createButton("info", ["info-button"], "info");
headerButtons.append(logoutButton, infoButton);
headerText.append(userName, chatName, headerButtons);
header.append(headerText);

const searchInput = createInput("search-input", ["search-input"], "Search...");
const searchButton = createButton("search-button", ["search-button"], "Search");
search.append(searchInput, searchButton);

const userStatus = createText(["user-status"], `on line`);
statusArea.append(userStatus);

const chatAreaText = createText(["chat-area__text"], "Write your first message...");
chatArea.append(chatAreaText);

const messageText = createInput("send-message-input", ["send-message-input"], "Message...");
const sendButton = createButton("send-button", ["send-button"], "send");
sendMessageArea.append(messageText, sendButton);

const footerText = createDiv(["footer-text"]);
const rsschool = createLink("https://rs.school/courses", ["rsschool-text"], "RSSchool");
const githubName = createLink("https://github.com/nadyavalin", ["github-text"], "nadyavalin");
const year = createText(["year-text"], "2024");
footerText.append(rsschool, githubName, year);
footer.append(footerText);
