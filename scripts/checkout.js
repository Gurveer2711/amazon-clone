import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch,loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import "../data/cart-class.js";
//import '../data/backend-practice.js';

  Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
      loadCart(() => {
        resolve('value1');
      });
    })

    ]).then(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    });

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {
    console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
    resolve();
    });
  });

}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
});*/

// loadProducts(()=>{
//   loadCart(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//   }); //anonymous function or a function without any page.
// });
