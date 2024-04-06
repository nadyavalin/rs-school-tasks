export function createInput(type: string, id: string, className: string, placeholder: string) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.name = id;
  input.classList.add(className);
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

export function createText(className: string, text: string) {
  const textP = document.createElement("p");
  textP.classList.add(className);
  textP.textContent = text;
  return textP;
}

export function createDiv(className: string) {
  const div = document.createElement("div");
  div.classList.add(className);
  return div;
}
