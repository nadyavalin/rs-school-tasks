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
let timer;
const imageWidth = 480;
let activeImageIndex = 0;
const sliderLine = document.querySelector(".slider__line");
const arrowPrev = document.querySelector(".slider__arrow-left");
const arrowNext = document.querySelector(".slider__arrow-right");

// Slider desktop pagination update
const paginationItems = document.querySelectorAll(".pagination__container");
function updatePaginationItems() {
  paginationItems.forEach((item, index) => {
    if (index === activeImageIndex) {
      item.classList.add("pagination__container_checked");
      item.style.animationPlayState = "paused"; // не работает
    } else {
      item.classList.remove("pagination__container_checked");
      item.style.animationPlayState = "running"; // не работает
    }
  });
}

// Switch slide
function switchSlide(index) {
  activeImageIndex = index;
  sliderLine.style.left = `${-activeImageIndex * imageWidth}px`;
  updatePaginationItems();

  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => switchSlide((activeImageIndex + 1) % 3), 5000);
}

// Slider desktop pagination
paginationItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    switchSlide(index);
  });
});

// Slider arrows for Prev
arrowPrev.addEventListener("click", () => {
  const prevIndex = (activeImageIndex - 1 + 3) % 3;
  switchSlide(prevIndex);
});

// Slider arrows for Next
arrowNext.addEventListener("click", () => {
  const nextIndex = (activeImageIndex + 1) % 3;
  switchSlide(nextIndex);
});

timer = setTimeout(() => switchSlide((activeImageIndex + 1) % 3), 5000);

// Touch moves
let x1 = null;
let y1 = null;

function touchHandler(event) {
  const firstTouch = event.touches[0];
  x1 = firstTouch.clientX;
  y1 = firstTouch.clientY;
}

function moveHandler(event) {
  if (!x1 || !y1) {
    return false;
  }

  const x2 = event.touches[0].clientX;
  const y2 = event.touches[0].clientY;
  const xDifferent = x2 - x1;
  const yDifferent = y2 - y1;

  if (Math.abs(xDifferent) > Math.abs(yDifferent)) {
    if (xDifferent > 0) {
      const prevIndex = (activeImageIndex - 1 + 3) % 3;
      switchSlide(prevIndex);
    } else {
      const nextIndex = (activeImageIndex + 1) % 3;
      switchSlide(nextIndex);
    }
  }
  x1 = null;
  y1 = null;
  return console.log(x1, x2);
}

document.addEventListener("touchstart", touchHandler, false);
document.addEventListener("touchmove", moveHandler, false);
