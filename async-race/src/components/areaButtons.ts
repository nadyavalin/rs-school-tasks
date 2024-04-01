import { createButton, createDiv } from "./elements";

export const prevNextButtons = createDiv("prev-next-buttons");
export const prevButton = createButton("prev", "prev-button", "prev");
export const nextButton = createButton("next", "next-button", "next");
prevNextButtons.append(prevButton, nextButton);
