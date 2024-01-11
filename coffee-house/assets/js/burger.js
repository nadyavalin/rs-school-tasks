// Burger-menu
function addListenersForBurgerMenu() {
    const header = document.querySelector(".header");
    const body = document.querySelector(".body");
  
    document.querySelector(".burger-menu__btn").addEventListener("click", () => {
      setTimeout(() => {
        header.classList.toggle("open");
        if (header.classList.contains("open")) {
          body.style.overflow = "hidden";
        } else {
          body.style.overflow = "auto";
        }
      }, 0);
    });
  
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        header.classList.remove("open");
      }
    });
  
    document.body.addEventListener("click", (event) => {
      if (
        !event.target.classList.contains("nav") &&
        !event.target.closest(".burger-menu__btn") &&
        header.classList.contains("open")
      ) {
        body.style.overflow = "auto";
        header.classList.remove("open");
      }
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    addListenersForBurgerMenu();
  });