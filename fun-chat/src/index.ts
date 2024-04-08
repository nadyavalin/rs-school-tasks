import "./index.css";
import { main, footer, header } from "pages/chat";
// import { form } from "../pages/loginForm";

// document.body.append(form);
document.body.classList.add("body-chat");
document.body.append(header, main, footer);

// document.addEventListener("DOMContentLoaded", (): void => {
//   const login = localStorage.getItem("user");
//   document.body.innerHTML = "";
//   if (login && password) {
//     main.append(startScreenPage());
//   } else {
//     main.append(form);
//   }
// });
