export function createInput(id: string, placeholder: string) {
  const input = document.createElement("input");
  input.type = "text";
  input.id = id;
  input.name = id;
  input.placeholder = placeholder;
  input.setAttribute("required", "true");
  return input;
}

export function createButton(text: string) {
  const button = document.createElement("button");
  button.type = "submit";
  button.id = "submit";
  button.name = "submit";
  button.disabled = true;
  button.classList.add("disabled");
  button.textContent = text;
  return button;
}
