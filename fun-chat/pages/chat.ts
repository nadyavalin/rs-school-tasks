import { createDiv, createElement, createLink, createText } from "src/components/elements";

export const header = createElement("header", ["header"]);
export const main = createElement("main", ["main"]);
export const footer = createElement("footer", ["footer"]);

const leftSide = createDiv(["left-side"]);
const search = createDiv(["left-side-search"]);
const membersList = createDiv(["left-side-member-list"]);

const rightSide = createDiv(["right-side"]);
const messagesArea = createDiv(["right-side-messages-area"]);
const sendMessageArea = createDiv(["right-side-chat-area"]);

leftSide.append(search, membersList);
rightSide.append(messagesArea, sendMessageArea);
main.append(leftSide, rightSide);

const footerText = createDiv(["footer-text"]);
const rsschool = createLink("https://rs.school/courses", ["rsschool-text"], "RSSchool");
const githubName = createLink("https://github.com/nadyavalin", ["github-text"], "nadyavalin");
const year = createText(["year-text"], "2024");
footerText.append(rsschool, githubName, year);
footer.append(footerText);
