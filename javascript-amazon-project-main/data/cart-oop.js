import { products } from "./products.js";
const cart = {

  cartItems: undefined,

 loadfromstorage(){
  this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));
if(!this.cartItems){
      this.cartItems = [
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
    
  },{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId:'2'
  }
];

}

},


 savetostorage(){
  localStorage.setItem('cart-oop',JSON.stringify(this.cartItems));
},
 addToCart(productId){


  let matchingItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'

        });
      }
this.savetostorage();
},
removeFromCart(productId){
  const newCart = [];
  
  this.cartItems.forEach((item)=>{
if(item.productId != productId){
  newCart.push(item);
}
  });

  this.cartItems = newCart;

  this.savetostorage();
},
updatedeliveryoption(productId,deliveryOptionId){

  let matchingItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      matchingItem.deliveryOptionId=deliveryOptionId

      savetostorage();
}

};


cart.loadfromstorage();








const businessCart = {

  cartItems: undefined,

 loadfromstorage(){
  this.cartItems = JSON.parse(localStorage.getItem('cart-business'));
if(!this.cartItems){
      this.cartItems = [
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
    
  },{
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId:'2'
  }
];

}

},


 savetostorage(){
  localStorage.setItem('cart-business',JSON.stringify(this.cartItems));
},
 addToCart(productId){


  let matchingItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'

        });
      }
this.savetostorage();
},
removeFromCart(productId){
  const newCart = [];
  
  this.cartItems.forEach((item)=>{
if(item.productId != productId){
  newCart.push(item);
}
  });

  this.cartItems = newCart;

  this.savetostorage();
},
updatedeliveryoption(productId,deliveryOptionId){

  let matchingItem;

      this.cartItems.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      matchingItem.deliveryOptionId=deliveryOptionId

      savetostorage();
}

};


businessCart.loadfromstorage();






console.log(cart);
console.log(businessCart);



