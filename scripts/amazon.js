import {addToCart,TotalQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


/*
Main idea of JS:
1. Save the data
2. Generate the HTML
3. Make it interactive
*/

//1. SAving the data

//this is called the data structures because it organizes the data
//let products = [];

//2. Generate the HTML
let productsHTML = "";
//Generating html for each product
products.forEach((product) => {
  //to accumulate the result
  productsHTML += ` 
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>
            
    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${formatCurrency(product.priceCents)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantity-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>  
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-${product.id}">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id = "${product.id}">
      Add to Cart
    </button>
  </div>
  `;
});

//Generating HTML throught JS
document.querySelector(".js-product-grid").innerHTML = productsHTML;

//3. Make it Interactive

//CART
function TotalCartQuantity(){
let totalCartQuantities = TotalQuantity();
document.querySelector(".js-total-quantity").innerHTML = totalCartQuantities;
}
TotalCartQuantity();
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    addToCart(productId);
    TotalCartQuantity();

    //Added
   const added = document.querySelector(`.js-added-${productId}`);
   added.classList.add("added-to-cart-visible");

   setTimeout(() => {
     added.classList.remove("added-to-cart-visible");
   }, 2000);

  });
});
