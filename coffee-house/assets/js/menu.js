import products from "./products.js";

const menuCards = document.querySelector(".menu-cards");
const menuCard = Array.from(document.querySelectorAll(".menu-card"));

// Get cards from Array of Objects
function renderProductCards(category) {
  const filteredProducts = products.filter(
    (product) => product.category === category
  );
  const filteredCards = filteredProducts
    .map(
      (product, index) =>
        `<li class="menu-card" data-product-id="${product.id}" key=${index}>
        <div class="menu-card__container">
          <img src="${product.src}" alt="${product.name}">
        </div>
        <div class="menu-card__text">
          <div class="menu-card__description">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
          <span>$${product.price}</span>
        </div>
      </li>`
    )
    .join("");

  menuCards.innerHTML = filteredCards;
}

document.addEventListener("DOMContentLoaded", () => {
  const coffeeInput = document.querySelector('input[value="coffee"]');
  coffeeInput.checked = true;

  renderProductCards("coffee");

  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const category = input.value;
      renderProductCards(category);
    });
  });
});

/* КОД НЕ РАБОТАЕТ */
// Price counter
function calculateTotalPrice(startPrice, selectedSize, checkedAdditives) {
  let totalPrice = startPrice + selectedSize + checkedAdditives;

  const radios = document.querySelectorAll('input[type="radio"]:checked');
  if (radios.length > 0) {
    const radioPrices = Array.from(radios).map((radio) => radio.value);
    radioPrices.forEach((price) => {
      totalPrice += price;
    });
  }

  const checkboxes = document.querySelectorAll(
    'input[type="ckeckbox"]:checked'
  );
  if (checkboxes.length > 0) {
    const checkboxPrices = Array.from(checkboxes).map(
      (checkbox) => checkbox.value
    );
    checkboxPrices.forEach((price) => {
      totalPrice += price;
    });
  }

  return totalPrice;
}
/* КОД НЕ РАБОТАЕТ */

// Get modals from Array of Objects
const modal = document.querySelector(".modal-window");

function showModal(product) {
  const modalItem = `<div class="modal">
      <div class="modal__img">
          <img src="${product.src}" alt="${product.name}">
      </div>
      <div class="modal__content">
          <div class="modal__text">
              <h4>${product.name}</h4>
              <p>${product.description}</p>
          </div>
          <div class="modal__size">
              <p>Size</p>
              <div class="size__buttons">
                  <div class="size__button">
                      <input type="radio" id="size-1" name="size" value="${
                        product.sizes.s.addPrice
                      }" checked>
                      <label for="size-1">
                          <span class="size__button-circle">S</span>
                          ${product.sizes.s.size}
                      </label>
                  </div>
                  <div class="size__button">
                      <input type="radio" id="size-2" name="size" value="${
                        product.sizes.m.addPrice
                      }">
                      <label for="size-2">
                          <span class="size__button-circle">M</span>
                          ${product.sizes.m.size}
                      </label>
                  </div>
                  <div class="size__button">
                      <input type="radio" id="size-3" name="size" value="${
                        product.sizes.l.addPrice
                      }">
                      <label for="size-3">
                          <span class="size__button-circle">L</span>
                          ${product.sizes.l.size}
                      </label>
                  </div>
              </div>
          </div>
          <div class="modal__additives">
              <p>Additives</p>
              <div class="additives__buttons">
                  <div class="additives__button">
                      <input type="checkbox" id="additives-1" name="sugar" value="${
                        product.additives[0].addPrice
                      }">
                      <label for="additives-1">
                          <span class="additives__button-circle">1</span>
                          ${product.additives[0].name}
                      </label>
                  </div>
                  <div class="additives__button">
                      <input type="checkbox" id="additives-2" name="cinnamon" value="${
                        product.additives[1].addPrice
                      }">
                      <label for="additives-2">
                          <span class="additives__button-circle">2</span>
                          ${product.additives[1].name}
                      </label>
                  </div>
                  <div class="additives__button">
                      <input type="checkbox" id="additives-3" name="syrup" value="${
                        product.additives[1].addPrice
                      }">
                      <label for="additives-3">
                          <span class="additives__button-circle">3</span>
                          ${product.additives[2].name}
                      </label>
                  </div>
              </div>
          </div>
          <div class="modal__total">
              <p>Total</p>
              <p>$${calculateTotalPrice(
                product.price,
                product.sizes,
                product.additives
              )}</p>
          </div>
          <div class="modal__warning">
              <hr class="modal__hr">
              <div class="modal__warning_text">
                  <img src="./assets/svg/info-empty.svg" alt="">
                  <p>The cost is not final. Download our mobile app to see the final price and place your
                      order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
                  </p>
              </div>
          </div>
          <button class="modal__close_btn">Close</button>
      </div>
  </div>`;

  modal.innerHTML = modalItem;
  modal.classList.add("open");
}

// Show modal
menuCards.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".menu-card");
  modal.style.display = 'flex';
  document.querySelector("body").style.overflow = 'hidden';

  if (clickedCard) {
    const { productId } = clickedCard.dataset;
    if (productId) {
      const product = products.find((card) => card.id === productId);
      if (product) {
        showModal(product);
      }
    }
  }
});

// Close modal
modal.addEventListener("click", (event) => {
  modal.style.display = 'none';
  document.querySelector("body").style.overflow = 'visible';

  if (event.target.closest(".modal__close_btn")) {
    modal.classList.remove("open");
  }
});

/* КОД НЕ РАБОТАЕТ */
// Hide cards
function hideCards() {
  menuCard.forEach((card, index) => {
    if (index < 4) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Show the rest Cards
function showRestCards(event) {
  if (event && event.target) {
    if (menuCard) {
      menuCard.style.display = "block";
    }
  }
}

function checkScreenSize() {
  if (window.innerWidth <= 768) {
    hideCards();
  } else {
    showRestCards();
  }
}

window.onload = checkScreenSize;
window.addEventListener("resize", checkScreenSize);

const refreshButton = document.querySelector(".menu__refresh-button img");
refreshButton.addEventListener("click", showRestCards);
/* КОД НЕ РАБОТАЕТ */
