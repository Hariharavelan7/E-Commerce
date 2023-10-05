const readline = require('readline');

class Product {
  constructor(name, price, available, discountPercentage = 0) {
    this.name = name;
    this.price = price;
    this.available = available;
    this.discountPercentage = discountPercentage;
  }

  calculateDiscountedPrice() {
    const discountAmount = (this.discountPercentage / 100) * this.price;
    return this.price - discountAmount;
  }
}

class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotalPrice() {
    const discountedPrice = this.product.calculateDiscountedPrice();
    return discountedPrice * this.quantity;
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
    console.log("Cart Items:");
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

// Sample products with discount percentages.
const products = [
  new Product("Laptop", 60000, true, 10),      // 10% discount
  new Product("Headphones", 200, true, 5),     // 5% discount
  new Product("Tablet", 35000, true),          // No discount
];

const cart = new ShoppingCart();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptForAction() {
  rl.question('Enter action \n1.add\n2.remove\n3.view\n4.bill\n5.finish\nEnter Your Choice : ', (action) => {
    if (action == 1) {
      promptAddProduct();
    } else if (action == 2) {
      promptRemoveProduct();
    } else if (action == 3) {
      cart.viewCart();
      promptForAction();
    } else if (action == 4) {
      const totalBill = cart.calculateTotalBill();
      console.log(`Your total bill is $${totalBill.toFixed(2)}.`);
      displayDiscountedPrices(); // Display discounted prices
      promptForAction();
    } else if (action == 5) {
      rl.close();
    } else {
      console.log('Invalid action. Please enter add/remove/view/bill/quit.');
      promptForAction();
    }
  });
}

function displayDiscountedPrices() {
  console.log("\nDiscounted Prices:");
  for (const product of products) {
    const discountedPrice = product.calculateDiscountedPrice();
    console.log(`${product.name}: $${discountedPrice.toFixed(2)}`);
  }
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

console.log('JS E-Commerce System\n Our products are\n 1.Laptop - Rs.60000 with 10% discount\n 2.Headphones - Rs.200 Only fixed price\n 3.Tablet - Rs.35000 with 5% discount');
promptForAction();