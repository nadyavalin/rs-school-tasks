import { createButton, createDiv, createElement, createInput, createLink, createSpan, createText } from "src/components/elements";
import {
  MessageDeletedResponse,
  MessageDeliveredStatusResponse,
  MessageEditResponse,
  MessageReadRequest,
  MessageReadStatusResponse,
  MessagesFromUserResponse,
  SendMessagePayloadResponse,
} from "src/types/types";
import {
  getMessageDeleteFunc,
  getMessageEditFunc,
  getMessageHistoryWithUserFunc,
  getMessageReadStatusChangeFunc,
  sendMessageToUserFunc,
} from "src/api/api";
import addZero from "src/utils/utils";
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

export function deleteMessage(user: MessageDeletedResponse) {
  getMessageDeleteFunc("", user.payload);
}

export function editMessage(user: MessageEditResponse) {
  getMessageEditFunc("", user.payload);
}

export function showDeliveredMessageStatus(user: MessageDeliveredStatusResponse) {
  return user.payload.message.status.isDelivered;
}

export function showReadMessageStatus(user: MessageReadStatusResponse) {
  return user.payload.message.status.isReaded;
}

// TODO
export function selectMessage(eventTarget: HTMLDivElement) {
  const messageElement = eventTarget.closest(".message-area") as HTMLDivElement;

  if (messageElement && messageElement.dataset.id) {
    // const messageId = messageElement.dataset.id;
    // state.selectedMessage = state.messages.find((message) => String(message.id) === messageId);

    messageInput.value = state.selectedMessage?.textContent ?? "";
  }
}

export function receiveMessage(payload: SendMessagePayloadResponse) {
  if (payload.message.from && state.selectedUser?.login) {
    chatArea.classList.add("right-side__chat-area_talk");
    const messageArea = createDiv(["message-area"]);
    const messageTopArea = createDiv(["message-top-area"]);
    const messageBottomArea = createDiv(["message-bottom-area"]);

    const messageFrom = createSpan(["message-from"], `${payload.message.from}`);

    const messageDateTime = new Date(payload.message.datetime);
    const formattedDateTime = `${addZero(messageDateTime.getDate())}.${addZero(messageDateTime.getMonth() + 1)}.${messageDateTime.getFullYear()},
    ${addZero(messageDateTime.getHours())}:${addZero(messageDateTime.getMinutes())}:${addZero(messageDateTime.getSeconds())}`;

    const messageDate = createSpan(["message-date"], formattedDateTime);
    const messageText = createText(["message-text"], `${payload.message.text}`);

    const messageDeliveredStatus = createSpan(["message-status"], `${payload.message.status.isDelivered ? "✅ Delivered" : "❌ Not Delivered"}`);
    const messageReadRequest: MessageReadRequest = {
      message: {
        id: payload.message.id,
      },
    };
    const messageReadStatus = createSpan(["message-status"], `${payload.message.status.isReaded ? "❇️ Read" : "⭕️ Not Read"}`);

    if (state.selectedUser) {
      getMessageReadStatusChangeFunc("", messageReadRequest);
    }

    messageTopArea.append(messageFrom, messageDate);
    messageBottomArea.append(messageDeliveredStatus, messageReadStatus);
    messageArea.append(messageTopArea, messageText, messageBottomArea);

    const menu = createElement("ul", ["right-click-menu"]);
    const menuItemDelete = createElement("li", ["right-click-menu_item"], "Delete");
    const menuItemEdit = createElement("li", ["right-click-menu_item"], "Edit");
    chatAreaText.append(messageArea, menu);

    messageArea.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      menu.style.top = `${event.clientY}px`;
      menu.style.left = `${event.clientX}px`;
      menu.classList.add("right-click-menu_active");
      menu.append(menuItemDelete, menuItemEdit);
    });

    document.addEventListener("click", (event) => {
      if (event.button !== 2) {
        menu.classList.remove("right-click-menu_active");
      }
    });

    menu.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    menuItemDelete.addEventListener("click", () => {
      Array.from(messageArea.children).forEach((message) => {
        if (message instanceof HTMLDivElement) {
          message.remove();
          getMessageDeleteFunc("", payload);
        }
      });
      menu.classList.remove("right-click-menu_active");
    });

    menuItemEdit.addEventListener("click", () => {
      console.log("edit message");
      menu.classList.remove("right-click-menu_active");
    });
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
