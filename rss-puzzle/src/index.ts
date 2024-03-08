import "./index.css";
import container from "./components/container";
import startScreenPage from "./components/startScreen";
import form, { logoutButton } from "./components/loginForm";

document.addEventListener("DOMContentLoaded", (): void => {
  const userName = localStorage.getItem("user");
  container.innerHTML = "";
  if (userName) {
    container.append(startScreenPage);
    container.append(logoutButton);
  } else {
    container.append(form);
  }
});

export default container;
