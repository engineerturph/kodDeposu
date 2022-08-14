// exporting module(variable exportlamazsan oburunde kullanamazsin)

// Blocking code
// console.log('a');
// await fetch('https://jsonplaceholder.typicode.com/posts');
//importu bekletirsen herkesi bekletirsin

console.log('exporting module');
const shippingCost = 10;
export const cart = [];

// her zaman top levelde exportlaman lazim
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalQuantity as tq, totalPrice };

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} added to carttt`);
} // burda olmayan bir variable i yazarsan bunu importla
