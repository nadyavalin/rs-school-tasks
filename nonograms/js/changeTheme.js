import { changeThemeButton } from "./buttons.js";

export function switchToLightMode() {
  document.body.classList.remove("dark");
  document.body.classList.add("light");
  if (changeThemeButton.textContent === "Light theme") {
    changeThemeButton.textContent = "Dark theme";
  }
}

export function switchToDarkMode() {
  document.body.classList.remove("light");
  document.body.classList.add("dark");
  if (changeThemeButton.textContent === "Dark theme") {
    changeThemeButton.textContent = "Light theme";
  }
}

// listener для кнопки смены темы
changeThemeButton.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    switchToDarkMode();
  } else {
    switchToLightMode();
  }
});
