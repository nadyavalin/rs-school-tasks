import "./index.css";
import "./pages/info.css";
import "./pages/loginForm.css";
import "./pages/chat.css";

import { buttonInfo, buttonLogin, form } from "./pages/loginForm";
import { backButton, infoArea } from "./pages/info";
import { main, footer, header } from "./pages/chat";

document.body.append(form);
document.body.classList.add("body-chat");

buttonLogin.addEventListener("click", () => {
  document.body.removeChild(form);
  document.body.append(header, main, footer);
});

buttonInfo.addEventListener("click", () => {
  document.body.removeChild(form);
  document.body.append(infoArea);
});

backButton.addEventListener("click", () => {
  document.body.removeChild(infoArea);
  document.body.append(form);
});

// document.addEventListener("DOMContentLoaded", (): void => {
//   const login = localStorage.getItem("user");
//   document.body.innerHTML = "";
//   if (login && password) {
//     main.append(startScreenPage());
//   } else {
//     main.append(form);
//   }
// });
