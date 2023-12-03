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

// Slider
let offset = 0; 
let activeImageIndex = 0;
const imageWidth = 480;
// let timer;
const sliderLine = document.querySelector(".slider__line");
const arrowPrev = document.querySelector(".slider__arrow-left");
const arrowNext = document.querySelector(".slider__arrow-right");

// Slider desktop pagination update
const paginationItems = document.querySelectorAll(".pagination__item");
function updatePaginationItems() {
  paginationItems.forEach((item, index) => {
    if (index === activeImageIndex) {
      item.classList.add("pagination__item_checked");
    } else {
      item.classList.remove("pagination__item_checked");
    }
  });
}

// Switch slider
function switchSlide(newOffset) {
  offset = newOffset;
  activeImageIndex = newOffset / imageWidth;
  sliderLine.style.left = `${-offset}px`;
  updatePaginationItems();
}

// Slider desktop pagination
paginationItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    switchSlide(index * imageWidth);
  });
});

// Slider arrows for Prev
function sliderRight() {
  offset -= 480;
  if (offset < 0) {
    offset = 960;
  }
}
arrowPrev.addEventListener("click", () => {
  sliderRight();
  switchSlide(offset);
});

// Slider arrows for Next
function sliderLeft() {
  offset += 480;
  if (offset > 960) {
    offset = 0;
  }
}
arrowNext.addEventListener("click", () => {
  sliderLeft();
  switchSlide(offset);
});

// Slider show
// function autoSlider() {
//   timer = setTimeout(sliderLeft(), 5000);
// }
// autoSlider();
