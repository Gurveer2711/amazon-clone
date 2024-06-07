export function Cart(localStorageKey){
    const cart = {
    cartItems : undefined,

    loadfromstorage(){
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));

    if (!this.cartItems) {
      //We are not using saving images and name , i.e bcoz we are taking product id and we can search rest of the deailts in the product array.
      //This method is called deduplicating the data or normalizing the data.
      //this is common technique in software engineering.
      this.cartItems = [
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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems)); //using JSON stringify because localstorage takes strings
    },


  addToCart(productId) {
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: quantity,
          deliveryOptionId : '1'
        });
      }
      this.saveToStorage();
    },
    
    removeFromCart(productId) {
      let newCart = [];
    
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
    
      this.cartItems = newCart;
      this.saveToStorage();
    },
    
    TotalQuantity() {
      /*cart quantity : 
        step1- Calculate the quantity
        step 2- put it on the web page
      */
      let totalQuantities = 0;
    
      this.cartItems.forEach((cartItem) => {
        totalQuantities += cartItem.quantity;
      });
      return totalQuantities;
    },
    
    updateQuantity(productId, newQuantity){
      let matchingItem;
      this.cartItems.forEach((cartItem)=>{
        if(cartItem.productId === productId){
          matchingItem = cartItem;
        }
      });
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    },
    //We need two things to update delivery option id : productid and deliveryOptionId
    /*
    Steps:
    1. Loop through the cart and find the product.
    2. Update the deliveryoptionid of the product.
    */
    updateDeliveryOption(productId,deliveryOptionId){
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      saveToStorage();
    }
  };
    return cart;
}

console.log(Cart('cart-oop'));
console.log(Cart('business-oop'));