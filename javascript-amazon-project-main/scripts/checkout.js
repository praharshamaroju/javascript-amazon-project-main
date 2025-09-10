import { products } from '../data/products.js';

import { cart,removeFromCart } from '../data/cart.js';
import { formatCurrency } from './utils/money.js';
import {hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import  dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryoptions } from '../data/deliveryoptions.js';


hello();
const today = dayjs();
const deliverydate = today.add(7,'days');
console.log(deliverydate);
console.log(deliverydate.format('dddd,MMMM,D'));


let cartsummaryHTML = '';
cart.forEach((item)=>{
  const productId = item.productId;

  let matchingProduct;

  products.forEach((product)=>{
if(product.id === productId){
  matchingProduct = product;
}
  });

  
cartsummaryHTML+=
`
<div class="cart-item-container 
js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">
                  ${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary
                js-delete-link"  data-product-id ="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
            </div>
              ${deliveryoptionsHTML(matchingProduct)}
            </div>
          </div>
        </div>

`
});

function deliveryoptionsHTML(matchingProduct){

let html = '';
deliveryoptions.forEach((deliveryoption)=>{
  const today =dayjs();
  const deliveryDate = today.add(
    deliveryoption.deliverydays,'days'
  );
  const datestring = deliveryDate.format('dddd,MMMM D');
  const pricestring = deliveryoption.pricecents
         ===0 ? 'FREE' : `$${formatCurrency(deliveryoption.pricecents)} - `;
     html+=  `
        <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${pricestring}  Shipping
                    </div>
                  </div>
                </div>
        `
  });
  return html;
}


                    
document.querySelector('.js-order-summary').innerHTML= cartsummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click',()=>{
const productId = link.dataset.productId;
removeFromCart(productId);


const container = document.querySelector(`.js-cart-item-container-${productId}`);

container.remove();
  });

});