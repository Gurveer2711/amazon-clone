import {
  cart,
  removeFromCart,
  TotalQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
let cartSummaryHTML = " ";

cart.forEach((cartItem) => {
  const MatchproductId = cartItem.productId;

  let matchingItem;

  //Eg of normalizing the data
  products.forEach((product) => {
    if (product.id === MatchproductId) {
      matchingItem = product;
    }
  });

  cartSummaryHTML += `
<div class="cart-item-container js-cart-item-container-${matchingItem.id}">
    <div class="delivery-date">
        Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src="${matchingItem.image}">

        <div class="cart-item-details">
        <div class="product-name">
            ${matchingItem.name}
        </div>
        <div class="product-price">
            $${formatCurrency(matchingItem.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label js-quantity-label-${
              matchingItem.id
            }">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity"
            data-product-id-code="${matchingItem.id}">
            Update
            </span>
            <input class ="quantity-input js-quantity-input-${
              matchingItem.id
            }" type="number" min="1" max="999">
            <span class = "save-quantity-link link-primary js-save-quantity"
            data-product-id-code="${matchingItem.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity"
             data-product-id-code="${matchingItem.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>
        <div class="delivery-option">
            <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
`;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

//Deleted items from cart
let deleteCart = document.querySelectorAll(".js-delete-quantity");
deleteCart.forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productIdCode;
    removeFromCart(productId);

    let deleteItem = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    deleteItem.remove();
    UpdateCheckoutQuantities();
  });
});

//update checkout quantity function
function UpdateCheckoutQuantities() {
  let totalQuantities = TotalQuantity();
  document.querySelector(
    ".js-checkout-return-to-home-link"
  ).innerHTML = `${totalQuantities} items`;
}

UpdateCheckoutQuantities();

//updated items from cart
let updateCart = document.querySelectorAll(".js-update-quantity");
updateCart.forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productIdCode;
    //To appear save
    const save = document.querySelector(`.js-cart-item-container-${productId}`);
    save.classList.add("is-editing-quantity");
  });
});


let saveCart = document.querySelectorAll(".js-save-quantity");
saveCart.forEach((link) => {
  link.addEventListener("click", () => {
    const productId = link.dataset.productIdCode;

    const save = document.querySelector(`.js-cart-item-container-${productId}`);

    save.classList.remove("is-editing-quantity");

    const quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`
    );

    const newQuantity = Number(quantityInput.value);
    updateQuantity(productId, newQuantity);

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
    
    UpdateCheckoutQuantities();
  });
});
