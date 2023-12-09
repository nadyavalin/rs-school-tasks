import products from "./products.js";

const menuCards = document.querySelector(".menu-cards");
const refreshButton = document.querySelector(".menu__refresh-button");
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
  const menuButtons = document.querySelector(".menu__buttons");
  const coffeeInput = document.querySelector('input[value="coffee"]');
  coffeeInput.checked = true;
  renderProductCards("coffee");

  menuButtons.addEventListener("click", (event) => {
    const menuButton = event.target.closest(".menu__button input");

    if (!menuButton) {
      return;
    }

    const category = menuButton.value;
    renderProductCards(category);

    if (category === "tea") {
      refreshButton.classList.add("menu__refresh-button_hidden");
    } else {
      refreshButton.classList.remove("menu__refresh-button_hidden");
    }
  });
});

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
                      <input type="radio" id="size-1" name="size" value="${product.sizes.s.addPrice}" checked>
                      <label for="size-1">
                          <span class="size__button-circle">S</span>
                          ${product.sizes.s.size}
                      </label>
                  </div>
                  <div class="size__button">
                      <input type="radio" id="size-2" name="size" value="${product.sizes.m.addPrice}">
                      <label for="size-2">
                          <span class="size__button-circle">M</span>
                          ${product.sizes.m.size}
                      </label>
                  </div>
                  <div class="size__button">
                      <input type="radio" id="size-3" name="size" value="${product.sizes.l.addPrice}">
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
                      <input type="checkbox" id="additives-1" name="additives" value="${product.additives[0].addPrice}">
                      <label for="additives-1">
                          <span class="additives__button-circle">1</span>
                          ${product.additives[0].name}
                      </label>
                  </div>
                  <div class="additives__button">
                      <input type="checkbox" id="additives-2" name="additives" value="${product.additives[1].addPrice}">
                      <label for="additives-2">
                          <span class="additives__button-circle">2</span>
                          ${product.additives[1].name}
                      </label>
                  </div>
                  <div class="additives__button">
                      <input type="checkbox" id="additives-3" name="additives" value="${product.additives[2].addPrice}">
                      <label for="additives-3">
                          <span class="additives__button-circle">3</span>
                          ${product.additives[2].name}
                      </label>
                  </div>
              </div>
          </div>
          <div class="modal__total">
              <p>Total</p>
              <p class="total-price" data-start-price="${product.price}">$${product.price}</p>
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

// Price counter
function calculateTotalPrice() {
  const radioChecked = document.querySelector('input[name="size"]:checked');

  const checkboxesChecked = document.querySelectorAll(
    'input[name="additives"]:checked'
  );
  const totalPriceElement = document.querySelector(".total-price");
  let totalPrice;

  if (!totalPriceElement) {
    return;
  }
  const startPrice = parseFloat(totalPriceElement.dataset.startPrice);

  if (radioChecked) {
    const radioPrice = parseFloat(radioChecked.value);
    totalPrice = startPrice + radioPrice;
  }

  if (checkboxesChecked) {
    const checkboxTotalPrice = Array.from(checkboxesChecked).reduce(
      (total, checkbox) => total + parseFloat(checkbox.value),
      0
    );
    totalPrice += checkboxTotalPrice;
  }
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Show modal
menuCards.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".menu-card");

  if (!clickedCard) {
    return;
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  const { productId } = clickedCard.dataset;
  const product = products.find((card) => card.id === productId);

  if (product) {
    showModal(product);
  }
});

// Check and close modal
modal.addEventListener("click", (event) => {
  if (event.target.closest(".modal__close_btn") || event.target === modal) {
    modal.style.display = "none";
    modal.classList.remove("open");
    document.body.style.overflow = "visible";
  }

  if (
    event.target.closest('input[name="size"]') ||
    event.target.closest('input[name="additives"]')
  ) {
    calculateTotalPrice();
  }
});

// Show cards
refreshButton.addEventListener("click", () => {
  menuCards.classList.remove("menu-cards_hidden");
  refreshButton.classList.add("menu__refresh-button_hidden");
});

function checkScreenSize() {
  if (window.innerWidth < 768) {
    menuCards.classList.add("menu-cards_hidden");
    refreshButton.classList.remove("menu__refresh-button_hidden");
  }
}

window.onload = checkScreenSize;
window.addEventListener("resize", checkScreenSize);
