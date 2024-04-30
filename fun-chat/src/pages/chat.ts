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
  if (payload.message.from === state.selectedUser?.login || payload.message.to === state.selectedUser?.login) {
    chatArea.classList.add("right-side__chat-area_talk");
    const messageArea = createDiv(["message-area"], { key: "id", value: payload.message.id });
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
    chatAreaText.append(messageArea);
  }
}

// TODO
export function showDeliveredMessageStatus(response: MessageDeliveredStatusRequestFromServer) {
  const messageId = response.payload.message.id;
  const messageArea = chatArea.querySelector(`.message-area[data-id="${messageId}"]`);
  const messageDeliveredStatus = createSpan(
    ["message-status"],
    `${response.payload.message.status.isDelivered ? "✅ Delivered" : "❌ Not Delivered"}`,
  );

  if (messageArea) {
    const messageBottomArea = messageArea.querySelector(".message-bottom-area");
    if (messageBottomArea) {
      messageBottomArea.append(messageDeliveredStatus);
    }
  }
}

// TODO
export function showReadMessageStatus(response: MessageReadStatusResponse) {
  if (response.payload.message.id) {
    getMessageReadStatusChangeFunc(response.payload.message.id, {
      message: {
        id: response.payload.message.id,
      },
    });
  }

  const messageReadStatus = createSpan(["message-status"], `${response.payload.message.status.isReaded ? "❇️ Read" : "⭕️ Not Read"}`);
  const messageBottomArea = document.querySelector(".message-bottom-area");
  if (chatArea && messageBottomArea) {
    messageBottomArea.append(messageReadStatus);
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
  const messageArea = document.querySelector(".message-area");
  if (messageArea) {
    const menu = createElement("ul", ["right-click-menu"]);
    const menuItemDelete = createElement("li", ["right-click-menu_item"], "Delete");
    const menuItemEdit = createElement("li", ["right-click-menu_item"], "Edit");

    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.classList.add("right-click-menu_active");
    menu.append(menuItemDelete, menuItemEdit);

    if (messageArea) {
      chatArea.append(menu);
    }
    document.addEventListener("click", (e) => {
      if (e.button !== 2) {
        menu.classList.remove("right-click-menu_active");
      }
    });

    menu.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    // TODO
    menuItemDelete.addEventListener("click", () => {
      Array.from(messageArea.children).forEach((message) => {
        if (message instanceof HTMLDivElement) {
          message.remove();
          getMessageDeleteFunc("", {
            message: {
              id: message.id,
            },
          });
        }
      });

      menu.classList.remove("right-click-menu_active");
    });

    // TODO
    menuItemEdit.addEventListener("click", () => {
      menu.classList.remove("right-click-menu_active");
    });
  }
});
