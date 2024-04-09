import "./index.css";
import "./pages/info.css";
import "./pages/loginForm.css";
import "./pages/chat.css";

// import { form } from "./pages/loginForm";
// import { infoArea } from "./pages/info";
import { main, footer, header } from "./pages/chat";

// document.body.append(form);
// document.body.append(infoArea);
document.body.append(header, main, footer);
document.body.classList.add("body-chat");

// document.addEventListener("DOMContentLoaded", (): void => {
//   const login = localStorage.getItem("user");
//   document.body.innerHTML = "";
//   if (login && password) {
//     main.append(startScreenPage());
//   } else {
//     main.append(form);
//   }
// });
