// Modals
const cards = document.querySelector(".menu-cards");
const modal = document.querySelector(".modal-window");
const modalContent = document.querySelector(".modal__content");

cards.addEventListener("click", (event) => {
  if (event.target.closest(".menu-card")) {
    modal.classList.add("open");
  }
});

modalContent.addEventListener("click", (event) => {
    if (event.target.closest(".modal__close_btn")) {
        modal.classList.remove("open");
    }
})
