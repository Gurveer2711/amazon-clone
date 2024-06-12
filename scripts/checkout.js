import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch,loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import "../data/cart-class.js";
//import '../data/backend-practice.js';

async function loadPage(){
  try {
    //throw 'error1';
    await loadProductsFetch();
  
    const value = await new Promise((resolve,reject) => { //to wait for the loadcart to complete we simply put await.
      loadCart(() => {
        resolve();

      });
    });

  } catch (error) {
    console.log('Unexpected error,Pleaase try again later.');
  }

  renderOrderSummary();
  renderPaymentSummary();

}
loadPage();

/*
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
*/

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
