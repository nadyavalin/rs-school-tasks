import { changeThemebutton } from "./buttons.js";

// смена темы
export function switchToLightMode() {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
  if (changeThemebutton.textContent === "Light theme") {
    changeThemebutton.textContent = "Dark theme";
  }
}

export function switchToDarkMode() {
  document.body.classList.remove("light");
  document.body.classList.add("dark");
  if (changeThemebutton.textContent === "Dark theme") {
    changeThemebutton.textContent = "Light theme";
  }
}
