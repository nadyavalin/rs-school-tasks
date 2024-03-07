import { createInput, createButton, createErrorMessage } from "./elements";

const firstNamePattern: RegExp = /^[A-Z][-a-z]{2,}$/;
const surnamePattern: RegExp = /^[A-Z][-a-z]{3,}$/;

const form = document.createElement("form");
const inputFirstName = createInput("fname", "input", "First Name");
const errorMsgForFirstName = createErrorMessage(
  "❌ Your first name must be more than 3 characters in English with a capital letter.",
);
const inputSurname = createInput("sname", "input", "Surname");
const errorMsgForSurname = createErrorMessage(
  "❌ Your surname must be more than 4 characters in English with a capital letter.",
);
const buttonLogin = createButton("Login");

form.append(
  inputFirstName,
  errorMsgForFirstName,
  inputSurname,
  errorMsgForSurname,
  buttonLogin,
);

function isLoginInputsEmpty(): boolean {
  const firstNameValue = inputFirstName.value.trim();
  const surnameValue = inputSurname.value.trim();
  return firstNameValue !== "" && surnameValue !== "";
}

function isValidInput(inputValue: string, pattern: RegExp): boolean {
  return pattern.test(inputValue);
}

function updateButtonLoginState(): void {
  const isValid = isLoginInputsEmpty();
  if (
    isValidInput(inputFirstName.value, firstNamePattern) &&
    isValidInput(inputSurname.value, surnamePattern)
  ) {
    buttonLogin.disabled = !isValid;
    buttonLogin.classList.toggle("disabled", !isValid);
  }
}

form.addEventListener("change", updateButtonLoginState);
inputFirstName.addEventListener("blur", () => {
  if (!isValidInput(inputFirstName.value, firstNamePattern)) {
    inputFirstName.classList.add("invalid");
  } else {
    inputFirstName.classList.remove("invalid");
  }
  updateButtonLoginState();
});

inputSurname.addEventListener("blur", () => {
  if (!isValidInput(inputSurname.value, surnamePattern)) {
    inputSurname.classList.add("invalid");
    inputSurname.classList.add("cross-icon");
  } else {
    inputSurname.classList.remove("invalid");
  }
  updateButtonLoginState();
});

inputFirstName.addEventListener("focus", () => {
  inputFirstName.classList.remove("invalid");
});

inputSurname.addEventListener("focus", () => {
  inputSurname.classList.remove("invalid");
});

export default form;
