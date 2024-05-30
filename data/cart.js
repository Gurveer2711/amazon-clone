export const cart = [];

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