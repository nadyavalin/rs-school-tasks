import { createButton, createDiv, createElement, createInput, createLink, createSpan, createText } from "src/components/elements";
import { MessagesFromUserResponse, SendMessagePayloadResponse } from "src/types/types";
import { sendMessageToUserFunc } from "src/api/api";
import addZero from "src/utils/utils";
import state from "src/store/state";
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
const sendMessageFormArea = createElement("form", ["right-side__send-message-area"]);

leftSide.append(search, membersList);
rightSide.append(statusArea, chatArea, sendMessageFormArea);
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

const chatAreaText = createText(["chat-area__text"], "Write your first message...");
chatArea.append(chatAreaText);

const messageInput = createInput("send-message-input", "text", ["send-message-input"], "Message...");
const sendButton = createButton("send-button", ["send-button"], "send");
sendMessageFormArea.append(messageInput, sendButton);

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

membersList.addEventListener("click", (event) => {
  statusArea.textContent = "";
  const eventTarget = event.target as HTMLLIElement;

  if (eventTarget?.classList.contains("li")) {
    if (state.selectedUser) {
      const { login, isLogined } = state.selectedUser;
      eventTarget.textContent = login;
      const choosedUserFromList = createText(["choosed-user"], `${login}`);
      const userStatus = createText(["user-status"], `${isLogined ? "online" : "offline"}`);
      statusArea.append(choosedUserFromList, userStatus);
    }
  }

  // if (state.selectedUser && state.selectedUser.login) {
  //   const selectedUserLogin = state.selectedUser.login;
  //   chatArea.textContent = "";
  //   getMessageHistoryWithUserFunc(selectedUserLogin, {
  //     user: {
  //       login: selectedUserLogin
  //     }
  //   });
  // }
});

function sendMessage(event: Event) {
  event.preventDefault();
  // chatArea.textContent = "";
  chatArea.classList.add("right-side__chat-area_talk");
  const messageText = messageInput.value.trim();
  if (messageText !== "" && state.selectedUser && state.selectedUser.login) {
    sendMessageToUserFunc("", {
      message: {
        to: state.selectedUser.login,
        text: messageText,
      },
    });
    messageInput.value = "";
  }
}

sendMessageFormArea.addEventListener("submit", sendMessage);

export function receiveMessage(payload: SendMessagePayloadResponse) {
  if (payload.message.from && state.selectedUser?.login) {
    chatArea.classList.add("right-side__chat-area_talk");
    const messageArea = createDiv(["message-area"]);
    const messageTopArea = createDiv(["message-top-area"]);

    const messageFrom = createSpan(["message-from"], `${payload.message.from}`);

    const messageDateTime = new Date(payload.message.datetime);
    const formattedDateTime = `${addZero(messageDateTime.getDate())}.${addZero(messageDateTime.getMonth() + 1)}.${messageDateTime.getFullYear()},
    ${addZero(messageDateTime.getHours())}:${addZero(messageDateTime.getMinutes())}:${addZero(messageDateTime.getSeconds())}`;

    const messageDate = createSpan(["message-date"], formattedDateTime);
    const messageText = createText(["message-text"], `${payload.message.text}`);
    const messageStatus = createSpan(["message-status"], `${payload.message.status}`);

    messageTopArea.append(messageFrom, messageDate);
    messageArea.append(messageTopArea, messageText, messageStatus);
    chatAreaText.append(messageArea);
  }
}

export function showChatHistory(user: MessagesFromUserResponse) {
  if (user.payload.messages.length > 0) {
    const chatHistory = user.payload.messages;
    if (state.selectedUser?.login) {
      chatHistory.forEach((message) => {
        receiveMessage({ message });
      });
    }
  }
}
