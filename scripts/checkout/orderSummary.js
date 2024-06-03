import {
  cart,
  removeFromCart,
  TotalQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //only one value we can take
import { deliveryOptions,getDeliveryOptionId } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = " ";

  cart.forEach((cartItem) => {
    const MatchproductId = cartItem.productId;

    const matchingItem = getProduct(MatchproductId);

    //also normalizing the data
    const deliveryDates = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptionId(deliveryDates);

    const today = dayjs();
    const delivery = today.add(deliveryOption.deliveryDays, "days");
    const dateString = delivery.format("dddd, MMMM, D");
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
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
    ${deliveryOptionsHTML(matchingItem, cartItem)}
    </div>
    </div>
    </div>
    `;
  });
  /*STEPS:
    1. We loop through the deliveryoptions.js
    2. We use dayJs library and also saved price in a variable
    3. we generate the html
    */
  function deliveryOptionsHTML(matchingItem, cartItem) {
    let deliveryHtml = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const delivery = today.add(deliveryOption.deliveryDays, "days");
      const dateString = delivery.format("dddd, MMMM, D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)}`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      deliveryHtml += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingItem.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
        ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingItem.id}">
        <div>
        <div class="delivery-option-date">
            ${dateString}
        </div>
        <div class="delivery-option-price">
            ${priceString} - Shipping
        </div>
        </div>
        </div>
    `;
    });
    return deliveryHtml;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  //Deleted items from cart
  let deleteCart = document.querySelectorAll(".js-delete-quantity");
  deleteCart.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productIdCode;
      removeFromCart(productId);

      
      renderOrderSummary();
      UpdateCheckoutQuantities();
      renderPaymentSummary();
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
      const save = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      save.classList.add("is-editing-quantity");
    });
  });

  let saveCart = document.querySelectorAll(".js-save-quantity");
  saveCart.forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productIdCode;

      const save = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      save.classList.remove("is-editing-quantity");

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      const newQuantity = Number(quantityInput.value);
      updateQuantity(productId, newQuantity);

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        newQuantity;

      UpdateCheckoutQuantities();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
