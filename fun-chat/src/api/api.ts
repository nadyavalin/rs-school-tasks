export const socket = new WebSocket("ws://localhost:4000");

socket.addEventListener("message", (event) => {
  console.log("Message from server ", event);
});

// TODO в этой функции надо писать реакции на то, что бэк присылает
socket.addEventListener("message", (event) => {
  const response = JSON.parse(event.data);
  if (response.type === "USER_LOGIN" && response.payload.user.isLogined) {
    console.log("Пользователь успешно авторизован");
  }
});

export function loginUser(id: string, login: string, password: string) {
  const requestData = {
    id,
    type: "USER_LOGIN",
    payload: {
      user: {
        login,
        password,
      },
    },
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}

export function logoutUser(id: string, login: string, password: string) {
  const requestData = {
    id,
    type: "USER_LOGOUT",
    payload: {
      user: {
        login,
        password,
      },
    },
  };

  const requestDataString = JSON.stringify(requestData);
  socket.send(requestDataString);
}
