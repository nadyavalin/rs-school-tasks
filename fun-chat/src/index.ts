import "./index.css";
import "./pages/info.css";
import "./pages/loginForm.css";
import "./pages/chat.css";

import { state } from "./store/state";
import { infoButton, formArea } from "./pages/loginForm";
import { backButton, infoArea } from "./pages/info";
import { footer, header, main } from "./pages/chat";

document.body.append(formArea);
document.body.classList.add("body-chat");

infoButton.addEventListener("click", () => {
  formArea.classList.add("form_hide");
  document.body.append(infoArea);
});

backButton.addEventListener("click", () => {
  document.body.removeChild(infoArea);
  if (!state.login) {
    formArea.classList.remove("form_hide");
  } else {
    document.body.append(header, main, footer);
  }
});
