export function createInput(
  id: string,
  className: string,
  placeholder: string,
) {
  const input = document.createElement("input");
  input.type = "text";
  input.id = id;
  input.name = id;
  input.classList.add(className);
  input.placeholder = placeholder;
  input.setAttribute("required", "true");
  return input;
}

export function createSubmitButton(text: string) {
  const button = document.createElement("button");
  button.type = "submit";
  button.id = "submit";
  button.name = "submit";
  button.disabled = true;
  button.classList.add("disabled");
  button.textContent = text;
  return button;
}

export function createButton(id: string, className: string, text = "") {
  const button = document.createElement("button");
  button.id = id;
  button.name = id;
  button.classList.add(className);
  button.textContent = text;
  return button;
}

export function createErrorMessage(text: string) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = text;
  return errorMessage;
}

export function createText(className: string, text: string) {
  const textP = document.createElement("p");
  textP.classList.add(className);
  textP.textContent = text;
  return textP;
}

export function createImage(src: string, alt: string, className: string) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.classList.add(className);
  return img;
}

export function createDiv(className: string) {
  const div = document.createElement("div");
  div.classList.add(className);
  return div;
}

export function createSpan(className: string, text: string) {
  const span = document.createElement("span");
  span.classList.add(className);
  span.textContent = text;
  return span;
}

export function createLabel(htmlFor: string, className: string, text: string) {
  const label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.classList.add(className);
  label.textContent = text;
  return label;
}

export function createSelect(name: string, className: string, id: string) {
  const select = document.createElement("select");
  select.name = name;
  select.classList.add(className);
  select.id = id;
  return select;
}

export function createOption(value: string, text: string) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  return option;
}
