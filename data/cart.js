export let cart = [
    //We are not using saving images and name , i.e bcoz we are taking product id and we can search rest of the deailts in the product array.
    //This method is called deduplicating the data or normalizing the data.
    //this is common technique in software engineering.
    {
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },{
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];

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
      });
    }
  }

  export function removeFromCart(productId){
    let newCart = [];

    cart.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });

    cart = newCart;
  }