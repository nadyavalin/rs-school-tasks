import { createButton, createDiv, createElement, createImage, createInput, createLink, createSpan, createText } from "src/components/elements";
import {
  MessageDeleteRequest,
  MessageDeliveredStatusRequestFromServer,
  MessageEditRequest,
  MessageReadStatusResponse,
  MessagesHistoryResponse,
  SendMessagePayloadResponse,
} from "src/types/types";
import {
  getMessageDeleteFunc,
  getMessageEditFunc,
  getMessageHistoryWithUserFunc,
  getMessageReadStatusChangeFunc,
  sendMessageToUserFunc,
} from "src/api/api";
import state from "src/store/state";
import { infoArea } from "./info";

export const header = createElement("header", ["header"]);
export const main = createElement("main", ["main"]);
export const footer = createElement("footer", ["footer"]);

const leftSide = createDiv(["left-side"]);
const search = createDiv(["left-side__search"]);
export const membersList = createElement("ul", ["left-side__member-list"]);
export const unreadMessage = createSpan(["unread-measage"], ``);

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
const logorsschool = createImage(["logo"], "public/img/logo.png", "RSSchool");
const rsschool = createLink("https://rs.school/courses", ["rsschool-text"]);
const githubName = createLink("https://github.com/nadyavalin", ["github-text"], "nadyavalin");
const year = createText(["year-text"], "2024");
rsschool.append(logorsschool);
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
  if (eventTarget && eventTarget.classList.contains("user-item")) {
    const { login } = eventTarget.dataset;

    if (login) {
      const isLogined = eventTarget.classList.contains("user-item_online");
      const status = isLogined ? "online" : "offline";
      state.selectedUser = { login, isLogined };
      const choosedUserFromList = createText(["choosed-user"], login);
      const userStatus = createText(["user-status"], status);
      statusArea.append(choosedUserFromList, userStatus);
      chatAreaText.textContent = "";
      getMessageHistoryWithUserFunc("", { user: { login: state.selectedUser.login } });
    }
  }
});

function sendMessage(event: Event) {
  event.preventDefault();
  chatArea.classList.add("right-side__chat-area_talk");
  const messageText = messageInput.value.trim();
  if (messageText !== "" && state.selectedUser?.login) {
    sendMessageToUserFunc("", {
      message: {
        to: state.selectedUser.login,
        text: messageText,
      },
    });
    messageInput.value = "";
  }
}

sendMessageFormArea.addEventListener("submit", (event) => {
  sendMessage(event);
  chatAreaText.scrollIntoView({ block: "end", behavior: "smooth" });
});

export function deleteMessage(message: MessageDeleteRequest) {
  getMessageDeleteFunc("", message);
}

export function editMessage(message: MessageEditRequest) {
  getMessageEditFunc("", message);
}

export function receiveMessage(payload: SendMessagePayloadResponse) {
  if (payload.message.from && state.selectedUser?.login) {
    chatArea.classList.add("right-side__chat-area_talk");
    const messageArea = createDiv(["message-area"]);
    const messageTopArea = createDiv(["message-top-area"]);
    const messageBottomArea = createDiv(["message-bottom-area"]);
    const messageFrom = createSpan(["message-from"], `${payload.message.from}`);
    const messageDateTime = new Date(payload.message.datetime);
    const formatter = new Intl.DateTimeFormat("ru", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const formattedDateTime = formatter.format(messageDateTime);
    const messageDate = createSpan(["message-date"], formattedDateTime);
    const messageText = createText(["message-text"], `${payload.message.text}`);

    messageTopArea.append(messageFrom, messageDate);
    messageArea.append(messageTopArea, messageText, messageBottomArea);
  }
}

export function showDeliveredMessageStatus(status: MessageDeliveredStatusRequestFromServer) {
  const messageDeliveredStatus = createSpan(["message-status"], `${status.payload.message.status.isDelivered ? "✅ Delivered" : "❌ Not Delivered"}`);
  const messageBottomArea = document.querySelector("message-bottom-area");
  const messageArea = document.querySelector("message-area");
  if (messageBottomArea && messageArea) {
    messageBottomArea.append(messageDeliveredStatus);
    messageArea.append(messageBottomArea);
  }
}

export function showReadMessageStatus(status: MessageReadStatusResponse) {
  if (status.payload.message.id) {
    getMessageReadStatusChangeFunc(status.payload.message.id, {
      message: {
        id: status.payload.message.id,
      },
    });
  }

  const messageReadStatus = createSpan(["message-status"], `${status.payload.message.status.isReaded ? "❇️ Read" : "⭕️ Not Read"}`);
  const messageBottomArea = document.querySelector("message-bottom-area");
  const messageArea = document.querySelector("message-area");
  if (messageBottomArea && messageArea) {
    messageBottomArea.append(messageReadStatus);
    messageArea.append(messageBottomArea);
  }
}

export function showChatHistory(messages: MessagesHistoryResponse) {
  if (messages.payload.messages.length > 0) {
    const chatHistory = messages.payload.messages;
    if (state.selectedUser?.login) {
      chatHistory.forEach((message) => {
        receiveMessage({ message });
      });
    }
  }
}

chatArea.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const messageArea = document.querySelector("message-area");
  if (chatArea.classList.contains("message-area")) {
    const menu = createElement("ul", ["right-click-menu"]);
    const menuItemDelete = createElement("li", ["right-click-menu_item"], "Delete");
    const menuItemEdit = createElement("li", ["right-click-menu_item"], "Edit");

    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.classList.add("right-click-menu_active");
    menu.append(menuItemDelete, menuItemEdit);

    document.addEventListener("click", (e) => {
      if (e.button !== 2) {
        menu.classList.remove("right-click-menu_active");
      }
    });

    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    menuItemDelete.addEventListener("click", () => {
      if (messageArea) {
        Array.from(messageArea.children).forEach((message) => {
          if (message instanceof HTMLDivElement) {
            message.remove();
            getMessageDeleteFunc("", payload);
          }
        });
      }

      menu.classList.remove("right-click-menu_active");
    });

    menuItemEdit.addEventListener("click", () => {
      menu.classList.remove("right-click-menu_active");
    });
    if (messageArea) {
      chatAreaText.append(messageArea, menu);
    }
  }
});
