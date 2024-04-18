import { showError } from "src/components/elements";
import { receiveMessage, showChatHistory } from "src/pages/chat";
import { displayActiveUsers, displayInactiveUsers, externalUserLogin, externalUserLogout, userLogin, userLogout } from "src/pages/loginForm";
import {
  TResponse,
  MessageType,
  UserLoginPayloadRequest,
  UserLogoutPayloadRequest,
  MessageRequest,
  MessageHistoryWithUsersRequest,
} from "src/types/types";

export const socket = new WebSocket("ws://localhost:4000");

socket.addEventListener("message", (event) => {
  const response: TResponse = JSON.parse(event.data);
  // console.log("Сообщение с сервера: ", event.data);
  switch (response.type) {
    case MessageType.USER_LOGIN:
      userLogin(response.payload);
      break;
    case MessageType.USER_LOGOUT:
      userLogout(response.payload);
      break;
    case MessageType.USER_EXTERNAL_LOGIN:
      externalUserLogin(response.payload);
      break;
    case MessageType.USER_EXTERNAL_LOGOUT:
      externalUserLogout(response.payload);
      break;
    case MessageType.USER_ACTIVE:
      displayActiveUsers(response.payload);
      break;
    case MessageType.USER_INACTIVE:
      displayInactiveUsers(response.payload);
      break;
    case MessageType.MSG_SEND:
      receiveMessage(response.payload);
      break;
    case MessageType.MSG_FROM_USER:
      showChatHistory(response);
      break;
    case MessageType.ERROR:
      showError(response);
      break;
    default:
      break;
  }
});

export function loginFunc(id: string, payload: UserLoginPayloadRequest) {
  const requestData = {
    id,
    type: MessageType.USER_LOGIN,
    payload,
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}

export function logoutFunc(id: string, payload: UserLogoutPayloadRequest) {
  const requestData = {
    id,
    type: MessageType.USER_LOGOUT,
    payload,
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}

export function activeUserFunc(id: string) {
  const requestData = {
    id,
    type: MessageType.USER_ACTIVE,
    payload: null,
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}

export function inactiveUserFunc(id: string) {
  const requestData = {
    id,
    type: MessageType.USER_INACTIVE,
    payload: null,
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}

export function sendMessageToUserFunc(id: string, payload: MessageRequest) {
  const requestData = {
    id,
    type: MessageType.MSG_SEND,
    payload,
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}

export function getMessageHistoryWithUserFunc(id: string, payload: MessageHistoryWithUsersRequest) {
  const requestData = {
    id,
    type: MessageType.MSG_FROM_USER,
    payload,
  };

  const requestDataString = JSON.stringify(requestData);
  // console.log(requestDataString);
  socket.send(requestDataString);
}
