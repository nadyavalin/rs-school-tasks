export function createInput(id: string, className: string[], placeholder: string) {
  const input = document.createElement("input");
  input.type = "text";
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

export function createElement(elem: string, className: string[]) {
  const element = document.createElement(elem);
  element.classList.add(...className);
  return element;
}
