import currentTemplates from "./currentTemplatesArray.js";

import {
  createDiv,
  createLabel,
  createSelect,
  createOption,
} from "./createElements.js";

import { chooseGameArea } from "./globalVariables.js";

export const sizeSelectWrap = createDiv(["wrapper__size-select"]);

export const labelSize = createLabel(
  "size-select",
  ["label__size-select"],
  "Choose a size:"
);
export const sizeSelect = createSelect("size", ["size-select"], "size-select");

export const pictureSelectWrap = createDiv(["wrapper__picture-select"]);

export const labelPicture = createLabel(
  "picture-select",
  ["label__picture-select"],
  "Choose a picture:"
);

export const pictureSelect = createSelect(
  "picture",
  ["picture-select"],
  "picture-select"
);

chooseGameArea.append(sizeSelectWrap, pictureSelectWrap);
sizeSelectWrap.append(labelSize, sizeSelect);
pictureSelectWrap.append(labelPicture, pictureSelect);

export function fillPictureSelect(size) {
  pictureSelect.innerHTML = "";
  currentTemplates
    .filter((item) => item.size === size)
    .forEach((item) => {
      createOption(item.name, item.name, pictureSelect);
    });
  pictureSelect.dispatchEvent(new Event("change"));
}

[5, 10, 15].forEach((size) => {
  createOption(size, `${size} x ${size}`, sizeSelect);
});
