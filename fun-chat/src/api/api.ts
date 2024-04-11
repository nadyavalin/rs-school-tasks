import { userLogin, userLogout } from "src/pages/loginForm";
import { MessageType, UserLoginPayloadRequest, UserLogoutPayloadRequest } from "src/types/types";

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
