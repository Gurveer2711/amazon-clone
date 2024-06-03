import { cart, TotalQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOptionId } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

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

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    
}



