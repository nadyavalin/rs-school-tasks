import { ActivePayloadResponse, InactivePayloadResponse, UserExternalPayloadResponse, UserLoginPayloadResponse } from "src/types/types";
import { createButton, createDiv, createElement, createInput, createSubmitButton, createText, createSnackbar } from "src/components/elements";
import { main, footer, header, logoutButton, userName, membersList } from "./chat";
import { socket, loginFunc, logoutFunc, activeUserFunc, inactiveUserFunc } from "../api/api";
import { state } from "../store/state";

const loginPattern: RegExp = /[-a-z]{2,}$/;
const passwordPattern: RegExp = /[-a-z0-9]{3,}$/;

export const formArea = createDiv(["form-area"]);

const form = document.createElement("form");
const inputLogin = createInput("login", "text", ["input"], "Login");
const errorMsgForFirstName = createText(["error-message"], "❌ Your login must be more than 3 characters.");
const inputPassword = createInput("password", "password", ["input"], "Password");
const errorMsgForSurname = createText(["error-message"], "❌ Your password must be more than 4 characters or/and numbers.");
export const loginButton = createSubmitButton("enter сhat");
export const infoButton = createButton("info", ["button", "form-info-button"], "info");
form.append(inputLogin, errorMsgForFirstName, inputPassword, errorMsgForSurname, loginButton);
formArea.append(form, infoButton);

function isLoginInputsNotEmpty(): boolean {
  return !!inputLogin.value.trim() && !!inputPassword.value.trim();
}

function isValidInput(inputValue: string, pattern: RegExp): boolean {
  return pattern.test(inputValue);
}

function updateButtonLoginState(): void {
  const isValid = isLoginInputsNotEmpty() && isValidInput(inputLogin.value, loginPattern) && isValidInput(inputPassword.value, passwordPattern);
  loginButton.disabled = !isValid;
  loginButton.classList.toggle("disabled", !isValid);
}

form.addEventListener("change", updateButtonLoginState);

socket.addEventListener("open", () => {});

export function setActiveUsers(payload: ActivePayloadResponse) {
  state.authorizedUsers = payload.users;
}

export function setInactiveUsers(payload: InactivePayloadResponse) {
  state.unauthorizedUsers = payload.users;
}

export function updateMembersList() {
  membersList.textContent = "";
  const users = state.authorizedUsers.concat(state.unauthorizedUsers);
  users.forEach((user) => {
    if (user.login === state.login) {
      return;
    }

    const userItem = createElement("li", ["user-item"]);
    userItem.textContent = user.login;
    userItem.dataset.login = user.login;
    if (user.isLogined) {
      userItem.classList.add("user-item_online");
    }
    membersList.append(userItem);
  });
}

export function userLogin(payload: UserLoginPayloadResponse) {
  const snackbarUserLogin = createSnackbar("Пользователь успешно авторизован");
  document.body.append(snackbarUserLogin);
  state.login = payload.user.login;
  userName.textContent = `User: ${state.login}`;
  state.authorizedUsers.push(payload.user);
  updateMembersList();

  if (state.login && state.password) {
    formArea.classList.add("form_hide");
    document.body.append(header, main, footer);
  }
}

export function userLogout() {
  state.id = "";
  state.login = "";
  state.password = "";
  userName.textContent = "";
  state.authorizedUsers = [];
  state.unauthorizedUsers = [];
  const snackbarUserLogout = createSnackbar("Пользователь успешно вышел из чата");
  document.body.append(snackbarUserLogout);
  form.classList.remove("form_hide");
  document.body.removeChild(header);
  document.body.removeChild(main);
  document.body.removeChild(footer);
  updateMembersList();
}

export function externalUserLogin(payload: UserExternalPayloadResponse) {
  state.authorizedUsers.push(payload.user);
  state.unauthorizedUsers = state.unauthorizedUsers.filter((user) => user.login !== payload.user.login);
  updateMembersList();
}

export function externalUserLogout(payload: UserExternalPayloadResponse) {
  state.unauthorizedUsers.push(payload.user);
  state.unauthorizedUsers = state.unauthorizedUsers.filter((user) => user.login !== payload.user.login);
  updateMembersList();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.login = inputLogin.value;
  state.password = inputPassword.value;

  activeUserFunc("");
  inactiveUserFunc("");
  loginFunc("", { user: { login: state.login, password: state.password } });
});

logoutButton.addEventListener("click", () => {
  logoutFunc("", { user: { login: state.login, password: state.password } });
  formArea.classList.remove("form_hide");
});

inputLogin.setAttribute("data-pattern", loginPattern.source);
inputPassword.setAttribute("data-pattern", passwordPattern.source);

const onBlur = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const { pattern } = input.dataset;

  if (pattern && input.value && isValidInput(input.value, new RegExp(pattern))) {
    input.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
  }
  updateButtonLoginState();
};

inputLogin.addEventListener("blur", onBlur);
inputPassword.addEventListener("blur", onBlur);

const onFocus = (event: Event) => {
  (event.target as HTMLElement).classList.remove("invalid");
};

inputLogin.addEventListener("focus", onFocus);

inputPassword.addEventListener("focus", onFocus);

export default form;
