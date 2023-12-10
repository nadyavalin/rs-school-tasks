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
let activeImageIndex = 0;
const imageWidth = 480;
const sliderLine = document.querySelector(".slider");
const arrowPrev = document.querySelector(".slider__arrow-left");
const arrowNext = document.querySelector(".slider__arrow-right");

// Slider desktop pagination update
const paginationContainer = document.querySelectorAll(".pagination__container");
function updatePaginationItems() {
  paginationContainer.forEach((item, index) => {
    if (index === activeImageIndex) {
      item.classList.add("pagination__container_checked");
    } else {
      item.classList.remove("pagination__container_checked");
    }
  });
}

// Switch slide
function switchSlide(index) {
  if (index > 2) {
    activeImageIndex = 0;
  } else if (index < 0) {
    activeImageIndex = 2;
  } else {
    activeImageIndex = index;
  }

  sliderLine.style.left = `${-activeImageIndex * imageWidth}px`;
  updatePaginationItems();

  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => switchSlide(activeImageIndex + 1), 5000);
}
timer = setTimeout(() => switchSlide(activeImageIndex + 1), 5000);

function pauseAnimation() {
  clearTimeout(timer);
  document
    .querySelector(".pagination__container_checked")
    .classList.add("paused");
}

function startAnimation() {
  document
    .querySelector(".pagination__container_checked")
    .classList.remove("paused");
}

sliderLine.addEventListener("mouseenter", pauseAnimation);
sliderLine.addEventListener("mousedown", pauseAnimation);
sliderLine.addEventListener("touchstart", pauseAnimation);
// Turn off the context menu on slider
// document.addEventListener("contextmenu", (e) => {
//   e.preventDefault();
// });

sliderLine.addEventListener("mouseleave", startAnimation);
sliderLine.addEventListener("mouseup", startAnimation);
sliderLine.addEventListener("touchend", startAnimation);


// Slider desktop pagination
paginationContainer.forEach((item, index) => {
  item.addEventListener("click", () => {
    switchSlide(index);
  });
  item.addEventListener("animationend", () => {
    switchSlide(activeImageIndex + 1);
  });
});

// Slider arrows for Prev
arrowPrev.addEventListener("click", () => {
  switchSlide(activeImageIndex - 1);
});

// Slider arrows for Next
arrowNext.addEventListener("click", () => {
  switchSlide(activeImageIndex + 1);
});

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
      switchSlide(activeImageIndex - 1);
    } else {
      switchSlide(activeImageIndex + 1);
    }
  }
  x1 = null;
  y1 = null;
  return console.log(x1, x2);
}

document.addEventListener("touchstart", touchHandler, false);
document.addEventListener("touchmove", moveHandler, false);
