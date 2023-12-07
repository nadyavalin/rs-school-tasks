import products from "./products.js";

// Get cards from Array of Objects
function renderProductCards(category) {
  const menuCards = document.querySelector(".menu-cards");
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

// Get modals from Array of Objects
const cards = document.querySelector(".menu-cards");
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
                      <input type="radio" id="size-1" name="size" value="${product.category}" checked>
                      <label for="size-1">
                          <span class="size__button-circle">S</span>
                          ${product.sizes.s.size}
                      </label>
                  </div>
                  <div class="size__button">
                      <input type="radio" id="size-2" name="size" value="${product.category}">
                      <label for="size-2">
                          <span class="size__button-circle">M</span>
                          ${product.sizes.m.size}
                      </label>
                  </div>
                  <div class="size__button">
                      <input type="radio" id="size-3" name="size" value="${product.category}">
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
                      <input type="radio" id="additives-1" name="additives" value="${product.category}" checked>
                      <label for="additives-1">
                          <span class="additives__button-circle">1</span>
                          ${product.additives[0].name}
                      </label>
                  </div>
                  <div class="additives__button">
                      <input type="radio" id="additives-2" name="additives" value="${product.category}">
                      <label for="additives-2">
                          <span class="additives__button-circle">2</span>
                          ${product.additives[1].name}
                      </label>
                  </div>
                  <div class="additives__button">
                      <input type="radio" id="additives-3" name="additives" value="${product.category}">
                      <label for="additives-3">
                          <span class="additives__button-circle">3</span>
                          ${product.additives[2].name}
                      </label>
                  </div>
              </div>
          </div>
          <div class="modal__total">
              <p>Total</p>
              <p>$${product.price}</p>
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

cards.addEventListener("click", (event) => {
  const clickedCard = event.target.closest(".menu-card");
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

modal.addEventListener("click", (event) => {
  if (event.target.closest(".modal__close_btn")) {
    modal.classList.remove("open");
  }
});
