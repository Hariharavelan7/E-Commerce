const readline = require('readline');

class Product {
  constructor(name, price, available) {
    this.name = name;
    this.price = price;
    this.available = available;
  }
}

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.cart = [];
  }

  addProduct(productName, quantity) {
    const product = this.findProductByName(productName);
    if (product) {
      const existingCartItem = this.cart.find((item) => item.product.name === productName);
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        this.cart.push(new CartItem(product, quantity));
      }
      console.log(`${quantity} ${productName}(s) added to your cart.`);
    } else {
      console.log(`Product "${productName}" not found.`);
    }
  }

  removeProduct(productName) {
    const index = this.cart.findIndex((item) => item.product.name === productName);
    if (index !== -1) {
      this.cart.splice(index, 1);
      console.log(`${productName} removed from your cart.`);
    } else {
      console.log(`Product "${productName}" not found in your cart.`);
    }
  }

  viewCart() {
    console.log("Your Cart Items:");
    for (const cartItem of this.cart) {
      console.log(`${cartItem.product.name} x${cartItem.quantity}`);
    }
  }

  calculateTotalBill() {
    let total = 0;
    for (const cartItem of this.cart) {
      total += cartItem.getTotalPrice();
    }
    return total;
  }

  findProductByName(productName) {
    return products.find((product) => product.name === productName && product.available);
  }
}

// Sample products
const products = [
  new Product("Laptop", 1000, true),
  new Product("Headphones", 50, true),
  new Product("Tablet", 300, true),
];

const cart = new ShoppingCart();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptForAction() {
  rl.question('Enter action (add/remove/view/bill/quit): ', (action) => {
    if (action.toLowerCase() === 'add') {
      promptAddProduct();
    } else if (action.toLowerCase() === 'remove') {
      promptRemoveProduct();
    } else if (action.toLowerCase() === 'view') {
      cart.viewCart();
      promptForAction();
    } else if (action.toLowerCase() === 'bill') {
      const totalBill = cart.calculateTotalBill();
      console.log(`Your total bill is $${totalBill}.`);
      promptForAction();
    } else if (action === 'quit') {
      rl.close();
    } else {
      console.log('Invalid action. Please enter add/remove/view/bill/quit.');
      promptForAction();
    }
  });
}

function promptAddProduct() {
  rl.question('Enter product name: ', (productName) => {
    rl.question('Enter quantity: ', (quantityStr) => {
      const quantity = Number(quantityStr);
      if (!isNaN(quantity)) {
        cart.addProduct(productName, quantity);
        promptForAction();
      } else {
        console.log('Invalid quantity. Please enter a valid number.');
        promptAddProduct();
      }
    });
  });
}

function promptRemoveProduct() {
  rl.question('Enter product name to remove: ', (productName) => {
    cart.removeProduct(productName);
    promptForAction();
  });
}

console.log('JS E-Commerce System');
promptForAction();