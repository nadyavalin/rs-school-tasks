// функция создания элементов div
export function createDiv(classNames, text) {
  const div = document.createElement("div");
  div.classList.add(...classNames);
  div.textContent = text;
  return div;
}

// функция создания элементов label
export function createLabel(htmlFor, classNames, text) {
  const label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.classList.add(...classNames);
  label.textContent = text;
  return label;
}

// функция создания элементов select
export function createSelect(name, classNames, id) {
  const select = document.createElement("select");
  select.name = name;
  select.classList.add(...classNames);
  select.id = id;
  return select;
}

// создание элемента option
export function createOption(value, text, select) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  select.append(option);
}

// функция создания элементов button
export function createButton(classNames, text) {
  const button = document.createElement("button");
  button.classList.add(...classNames);
  button.textContent = text;
  return button;
}

// функция создание элемента audio
export function createAudio(src) {
  const audio = document.createElement("audio");
  audio.src = src;
  document.body.append(audio);
  return audio;
}
