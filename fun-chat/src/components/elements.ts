import { ErrorResponse, MessageType, TResponse } from "src/types/types";

export function createInput(id: string, type: string, className: string[], placeholder: string) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  input.classList.add(...className);
  input.placeholder = placeholder;
  input.setAttribute("required", "true");
  return input;
}

export function createButton(id: string, className: string[], text = "") {
  const button = document.createElement("button");
  button.id = id;
  button.name = id;
  button.classList.add(...className);
  button.textContent = text;
  return button;
}

export function createSubmitButton(text: string) {
  const button = createButton("submit", ["submit"], text);
  button.type = "submit";
  button.disabled = true;
  return button;
}

export function createText(className: string[], text: string) {
  const textP = document.createElement("p");
  textP.classList.add(...className);
  textP.textContent = text;
  return textP;
}

export function createLink(link: string, className: string[], text: string) {
  const linkA = document.createElement("a");
  linkA.href = link;
  linkA.target = "_blank";
  linkA.classList.add(...className);
  linkA.textContent = text;
  return linkA;
}

export function createDiv(className: string[]) {
  const div = document.createElement("div");
  div.classList.add(...className);
  return div;
}

export function createSpan(className: string[], text: string) {
  const span = document.createElement("span");
  span.classList.add(...className);
  span.textContent = text;
  return span;
}

export function createElement(elem: string, className: string[], text?: string) {
  const element = document.createElement(elem);
  element.classList.add(...className);
  if (text) {
    element.textContent = text;
  }
  return element;
}

export function createSnackbar(text: string) {
  let opacity = 1;
  const snackbar = document.createElement("div");
  const vertical = "top";
  const horizontal = "right";
  const open = true;

  const fadeOutInterval = setInterval(() => {
    opacity -= 0.1;
    snackbar.style.opacity = opacity.toString();
    if (opacity <= 0) {
      clearInterval(fadeOutInterval);
      document.body.removeChild(snackbar);
    }
  }, 300);

  if (open) {
    snackbar.style.position = "fixed";
    snackbar.style.top = vertical === "top" ? "20px" : "auto";
    snackbar.style.right = horizontal === "right" ? "20px" : "auto";
  }

  snackbar.classList.add("snackbar");
  snackbar.textContent = text;
  return snackbar;
}

export function showError(payload: TResponse) {
  if (payload.type === MessageType.ERROR) {
    const errorData = (payload as ErrorResponse).payload.error;
    const snackbar = createSnackbar(errorData);
    document.body.append(snackbar);
  }
}
