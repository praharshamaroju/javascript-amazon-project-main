import{cart} from '../../data/cart.js';
import { getproduct } from '../../data/products.js';
import { getdeliveryoption }  from  '../../data/deliveryoptions.js';
import {formatCurrency} from '../utils/money.js';
export function renderpaymentsummary(){

  let productpricecents = 0;
  let shippingpricecents=0;
  cart.forEach((item)=>{

     const product =  getproduct(item.productId);
     productpricecents+= product.priceCents * item.quantity;
  

const deliveryoption= getdeliveryoption(item.deliveryOptionId);
shippingpricecents += deliveryoption.priceCents
  });
const totalbeforetaxCents = productpricecents + shippingpricecents;
const taxCents = Math.round(totalbeforetaxCents*0.1);
const totalCents = totalbeforetaxCents+taxCents;



const paymentsummaryHTML = `

    <div class="payment-summary-title">
                Order Summary
              </div>

              <div class="payment-summary-row">
                <div>Items (3):</div>
                <div class="payment-summary-money">
                $${formatCurrency(productpricecents)}</div>
              </div>

              <div class="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div class="payment-summary-money">$${formatCurrency(shippingpricecents)}</div>
              </div>

              <div class="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div class="payment-summary-money">$${formatCurrency(totalbeforetaxCents)}</div>
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

    `
document.querySelector('.js-payment-summary').innerHTML=paymentsummaryHTML;

    };

