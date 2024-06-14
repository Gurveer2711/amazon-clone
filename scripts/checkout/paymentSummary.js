import { cart, TotalQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptionId } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let getShippingprice = 0;
  cart.forEach((cartItem) => {
    const products = getProduct(cartItem.productId);
    productPriceCents += products.priceCents * cartItem.quantity;

    const deliveryOptionId = getDeliveryOptionId(cartItem.deliveryOptionId);
    getShippingprice += deliveryOptionId.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + getShippingprice;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  let totalItems = TotalQuantity();



  const paymentSummaryHTML = ` 
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-summary-row">Items (${totalItems}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(getShippingprice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary
            js-place-order">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

 document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
        
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

        const order = await response.json();
        addOrder(order);
        
      } catch (error) {
        console.log('Unexpected Error. Reload the page again.');
      }

      
      window.location.href = 'orders.html';

    });
  
  }


    // });
