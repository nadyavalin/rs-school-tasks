import {
  createInput,
  createSubmitButton,
  createText,
  createButton,
} from "./elements";

import { saveUserToLocalStorage, logoutUser } from "./localStorage";
import container from "./container";
import createStartScreen from "./startScreen";

const firstNamePattern: RegExp = /^[A-Z][-a-z]{2,}$/;
const surnamePattern: RegExp = /^[A-Z][-a-z]{3,}$/;

const form = document.createElement("form");
const inputFirstName = createInput("fname", "input", "First Name");
const errorMsgForFirstName = createText(
  "error-message",
  "❌ Your first name must be more than 3 characters in English with a capital letter.",
);
const inputSurname = createInput("sname", "input", "Surname");
const errorMsgForSurname = createText(
  "error-message",
  "❌ Your surname must be more than 4 characters in English with a capital letter.",
);
const buttonLogin = createSubmitButton("Login");

form.append(
  inputFirstName,
  errorMsgForFirstName,
  inputSurname,
  errorMsgForSurname,
  buttonLogin,
);

function isLoginInputsNotEmpty(): boolean {
  return !!inputFirstName.value.trim() && !!inputSurname.value.trim();
}

function isValidInput(inputValue: string, pattern: RegExp): boolean {
  return pattern.test(inputValue);
}

function updateButtonLoginState(): void {
  const isValid =
    isLoginInputsNotEmpty() &&
    isValidInput(inputFirstName.value, firstNamePattern) &&
    isValidInput(inputSurname.value, surnamePattern);
  buttonLogin.disabled = !isValid;
  buttonLogin.classList.toggle("disabled", !isValid);
}

form.addEventListener("change", updateButtonLoginState);

export const logoutButton = createButton(
  "log-out",
  "log-out-button",
  "Log out",
);

logoutButton.addEventListener("click", () => {
  logoutUser();
  container.innerHTML = "";
  container.append(form);
  logoutButton.remove();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = {
    firstName: inputFirstName.value,
    surname: inputSurname.value,
  };

  saveUserToLocalStorage(user);
  container.innerHTML = "";
  container.append(createStartScreen());
  container.append(logoutButton);
});

inputFirstName.setAttribute("data-pattern", firstNamePattern.source);
inputSurname.setAttribute("data-pattern", surnamePattern.source);

const onBlur = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const { pattern } = input.dataset;

  if (
    pattern &&
    input.value &&
    isValidInput(input.value, new RegExp(pattern))
  ) {
    input.classList.remove("invalid");
  } else {
    input.classList.add("invalid");
  }
  updateButtonLoginState();
};

inputFirstName.addEventListener("blur", onBlur);
inputSurname.addEventListener("blur", onBlur);

const onFocus = (event: Event) => {
  (event.target as HTMLElement).classList.remove("invalid");
};

inputFirstName.addEventListener("focus", onFocus);

inputSurname.addEventListener("focus", onFocus);

export default form;
