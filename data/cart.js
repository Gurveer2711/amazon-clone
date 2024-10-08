export let cart;

loadfromstorage();
export function loadfromstorage(){
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    //We are not using saving images and name , i.e bcoz we are taking product id and we can search rest of the deailts in the product array.
    //This method is called deduplicating the data or normalizing the data.
    //this is common technique in software engineering.
    cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId : '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId : '2'
    }];
  }
}
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart)); //using JSON stringify because localstorage takes strings
}

export function addToCart(productId) {
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );
  const quantity = Number(quantitySelector.value);
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId : '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
}

export function TotalQuantity() {
  /*cart quantity : 
    step1- Calculate the quantity
    step 2- put it on the web page
  */
  let totalQuantities = 0;

  cart.forEach((cartItem) => {
    totalQuantities += cartItem.quantity;
  });
  return totalQuantities;
}

export function updateQuantity(productId, newQuantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToStorage();
}
//We need two things to update delivery option id : productid and deliveryOptionId
/*
Steps:
1. Loop through the cart and find the product.
2. Update the deliveryoptionid of the product.
*/
export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

export function loadCart(func){
  const xhr = new XMLHttpRequest();

xhr.addEventListener('load',()=>{
  console.log(xhr.response);

  func(); //this function is callled callback function bcoz we gave the parameter a function to run in the future.
});

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send(); //it is async. this will create and send the request but it wont wait for the response to come back.
}