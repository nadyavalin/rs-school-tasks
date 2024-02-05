import { createDiv,  createLabel, createSelect} from "./createElements.js";

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
