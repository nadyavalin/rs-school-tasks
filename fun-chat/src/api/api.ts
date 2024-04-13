import { externalUserLogin, externalUserLogout, userLogin, userLogout } from "src/pages/loginForm";
import { ActivePayloadRequest, InactivePayloadRequest, MessageType, UserLoginPayloadRequest, UserLogoutPayloadRequest } from "src/types/types";

export const socket = new WebSocket("ws://localhost:4000");

socket.addEventListener("message", (event) => {
  const response = JSON.parse(event.data);
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

export function activeUserFunc(id: string, payload: ActivePayloadRequest) {
  const requestData = {
    id,
    type: MessageType.USER_ACTIVE,
    payload,
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}

export function inactiveUserFunc(id: string, payload: InactivePayloadRequest) {
  const requestData = {
    id,
    type: MessageType.USER_INACTIVE,
    payload,
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}
