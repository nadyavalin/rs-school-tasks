import "./index.css";
import "./pages/info.css";
import "./pages/loginForm.css";
import "./pages/chat.css";

import { infoButton, formArea } from "./pages/loginForm";
import { backButton, infoArea } from "./pages/info";

document.body.append(formArea);
document.body.classList.add("body-chat");

infoButton.addEventListener("click", () => {
  formArea.classList.add("form_hide");
  document.body.append(infoArea);
});

backButton.addEventListener("click", () => {
  document.body.removeChild(infoArea);
  formArea.classList.remove("form_hide");
});
