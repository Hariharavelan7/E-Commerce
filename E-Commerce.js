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
      total += cartItem.product.price * cartItem.quantity;
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

// Sample interactions (you can replace these with user input)
cart.addProduct("Laptop", 2);
cart.addProduct("Headphones", 1);
cart.addProduct("Tablet", 3);
cart.viewCart();
cart.removeProduct("Tablet");
cart.viewCart();

// Calculate and display the total bill
const totalBill = cart.calculateTotalBill();
console.log(`Your total bill is $${totalBill}.`);
