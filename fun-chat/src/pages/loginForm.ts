import { UserLoginPayloadResponse, UserLogoutPayloadResponse } from "src/types/types";
import { createButton, createDiv, createInput, createSubmitButton, createText } from "src/components/elements";
import { main, footer, header, logoutButton, userName } from "./chat";
import { socket, loginFunc, logoutFunc } from "../api/api";
import { state } from "../store/state";

const loginPattern: RegExp = /[-a-z]{2,}$/;
const passwordPattern: RegExp = /[-a-z0-9]{3,}$/;

export const form = document.createElement("form");
const inputLogin = createInput("login", "text", ["input"], "Login");
const errorMsgForFirstName = createText(["error-message"], "❌ Your login must be more than 3 characters.");
const inputPassword = createInput("password", "password", ["input"], "Password");
const errorMsgForSurname = createText(["error-message"], "❌ Your password must be more than 4 characters or/and numbers.");
const formButtons = createDiv(["form-buttons"]);
export const buttonLogin = createSubmitButton("enter сhat");
export const buttonInfo = createButton("info", ["button"], "info");
formButtons.append(buttonLogin, buttonInfo);

form.append(inputLogin, errorMsgForFirstName, inputPassword, errorMsgForSurname, formButtons);

function isLoginInputsNotEmpty(): boolean {
  return !!inputLogin.value.trim() && !!inputPassword.value.trim();
}

function isValidInput(inputValue: string, pattern: RegExp): boolean {
  return pattern.test(inputValue);
}

buttonLogin.classList.add("disabled");
function updateButtonLoginState(): void {
  const isValid = isLoginInputsNotEmpty() && isValidInput(inputLogin.value, loginPattern) && isValidInput(inputPassword.value, passwordPattern);
  buttonLogin.disabled = !isValid;
  buttonLogin.classList.toggle("disabled", !isValid);
}

form.addEventListener("change", updateButtonLoginState);

socket.addEventListener("open", () => {});

export function userLogin(payload: UserLoginPayloadResponse) {
  if (payload.user.isLogined) {
    console.log("Пользователь успешно авторизован");
    userName.textContent = `User: ${state.login}`;
  }
}

export function userLogout(payload: UserLogoutPayloadResponse) {
  if (!payload.user.isLogined) {
    console.log("Пользователь успешно вышел из системы");
    state.id = "";
    state.login = "";
    state.password = "";
    userName.textContent = "";

    document.body.removeChild(header);
    document.body.removeChild(main);
    document.body.removeChild(footer);
    form.classList.remove("form_hide");
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  state.login = inputLogin.value;
  state.password = inputPassword.value;

  loginFunc("", { user: { login: state.login, password: state.password } });
});

logoutButton.addEventListener("click", () => {
  logoutFunc("", { user: { login: state.login, password: state.password } });
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
