import { createButton, createDiv, createInput, createSubmitButton, createText } from "src/components/elements";
import { main, footer, header, logoutButton } from "./chat";

const loginPattern: RegExp = /[-a-z]{2,}$/;
const passwordPattern: RegExp = /[-a-z]{3,}$/;

export const form = document.createElement("form");
const inputLogin = createInput("login", ["input"], "Login");
const errorMsgForFirstName = createText(["error-message"], "❌ Your login must be more than 3 characters in English with a capital letter.");
const inputPassword = createInput("password", ["input"], "Password");
const errorMsgForSurname = createText(["error-message"], "❌ Your password must be more than 4 characters in English.");
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

function updateButtonLoginState(): void {
  const isValid = isLoginInputsNotEmpty() && isValidInput(inputLogin.value, loginPattern) && isValidInput(inputPassword.value, passwordPattern);
  buttonLogin.disabled = !isValid;
  buttonLogin.classList.toggle("disabled", !isValid);
}

form.addEventListener("change", updateButtonLoginState);

logoutButton.addEventListener("click", () => {
  document.body.removeChild(header);
  document.body.removeChild(main);
  document.body.removeChild(footer);
  document.body.append(form);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // const user = {
  //   login: inputLogin.value,
  //   password: inputPassword.value,
  // };

  // saveUserToLocalStorage(user);
  // container.innerHTML = "";
  // container.append(createStartScreen());
  // container.append(logoutButton);
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
