import { products } from '../../data/products.js';
import { cart, removeFromCart, updatedeliveryoption } from '../../data/cart.js';
import { formatCurrency } from '../utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryoptions,getdeliveryoption } from '../../data/deliveryoptions.js';
import { getproduct } from '../../data/products.js';
import { renderpaymentsummary } from './paymentsummary.js';



export function renderordersummary() {
  let cartsummaryHTML = '';

  cart.forEach((item) => {
    const productId = item.productId;


  
    const matchingProduct = getproduct(productId);
   

    const deliveryOptionId = item.deliveryOptionId;
    
    const deliveryoption = getdeliveryoption(deliveryOptionId);
    
    const today = dayjs();
    const deliveryDate = today.add(deliveryoption.deliverydays, 'days');
    const datestring = deliveryDate.format('dddd,MMMM D');

    cartsummaryHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${datestring}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-quantity-${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${item.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link
              js-delete-link-${matchingProduct.id}
              "  
                data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryoptionsHTML(matchingProduct, item)}
          </div>
        </div>
      </div>
    `;
  });

  // Update DOM
  document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;

  // Delete button logic
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();


      renderpaymentsummary();

    });
  });

  // Delivery option logic
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updatedeliveryoption(productId, deliveryOptionId);
      renderordersummary(); // re-render with new date

      renderpaymentsummary();
    });
  });
}

function deliveryoptionsHTML(matchingProduct, item) {
  let html = '';
  deliveryoptions.forEach((deliveryoption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryoption.deliverydays, 'days');
    const datestring = deliveryDate.format('dddd,MMMM D');

    const pricestring =
      deliveryoption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryoption.priceCents)} - `;

    const ischecked = deliveryoption.id === item.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryoption.id}">
        <input type="radio"
          ${ischecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">${datestring}</div>
          <div class="delivery-option-price">${pricestring} Shipping</div>
        </div>
      </div>
    `;
  });
  return html;
}


