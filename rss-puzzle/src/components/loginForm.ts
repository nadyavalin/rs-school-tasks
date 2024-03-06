import { createInput, createButton } from "./elements";

const form = document.createElement("form");
const inputFirstName = createInput("fname", "First Name");
const inputSurname = createInput("sname", "Surname");
const buttonLogin = createButton("Login");

form.append(inputFirstName, inputSurname, buttonLogin);

function checkLoginInputs(): boolean {
  const loginValue = inputFirstName.value.trim();
  const passwordLogValue = inputSurname.value.trim();
  return loginValue !== "" && passwordLogValue !== "";
}

function updateButtonLoginState(): void {
  const isValid = checkLoginInputs();
  buttonLogin.disabled = !isValid;
  buttonLogin.classList.toggle("disabled", !isValid);
}

inputFirstName.addEventListener("input", updateButtonLoginState);
inputSurname.addEventListener("input", updateButtonLoginState);

export default form;
