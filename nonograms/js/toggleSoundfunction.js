import {
  blackCellAudio,
  crossCellAudio,
  whiteCellAudio,
  winAudio,
} from "./sounds.js";

import { soundButton } from "./buttons.js";

// включение/выключение звука
function toggleSound() {
  blackCellAudio.muted = !blackCellAudio.muted;
  crossCellAudio.muted = !crossCellAudio.muted;
  whiteCellAudio.muted = !whiteCellAudio.muted;
  winAudio.muted = !winAudio.muted;
  if (soundButton.textContent === "On sounds") {
    soundButton.textContent = "Off sounds";
  } else {
    soundButton.textContent = "On sounds";
  }
}
export default toggleSound;
