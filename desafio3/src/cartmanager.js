const path = require('path');
const fs = require('fs').promises;

class CartNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CartNotFoundError';
  }
}

class CartManager {
  constructor() {
    this.cartsFile = path.join(__dirname, 'carts.json');
  }


  async createCart() {
    try {
      const allCarts = await this.loadCarts();
      const newCart = {
        id: this.generateUniqueId(allCarts),
        products: [],
      };
      allCarts.push(newCart);
      await this.saveCarts(allCarts);
      return newCart;
    } catch (error) {
      throw new Error('Error creating cart');
    }
  }

  async getCartById(cartId) {
    try {
      const allCarts = await this.loadCarts();
      const cart = allCarts.find(c => c.id === cartId);
      if (!cart) {
        throw new CartNotFoundError('Cart not found');
      }
      return cart;
    } catch (error) {
      throw new Error('Error getting cart');
    }
  }
  

  async addProductToCart(cartId, productId, quantity) {
    try {
      const allCarts = await this.loadCarts();
      const cart = allCarts.find(c => c.id === cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }

      const productIndex = cart.products.findIndex(p => p.product === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await this.saveCarts(allCarts);
      return cart;
    } catch (error) {
      throw new Error('Error adding product to cart');
      throw new CartNotFoundError('Cart not found');
    }
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(this.cartsFile, 'utf-8');
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      return [];
    }
  }

  async saveCarts(carts) {
    try {
      await fs.writeFile(this.cartsFile, JSON.stringify(carts, null, 2), 'utf-8');
    } catch (error) {
      throw new Error('Error saving carts');
    }
  }

  generateUniqueId(allItems) {
    let id;
    do {
      id = Math.random().toString(36).substr(2, 9);
    } while (allItems.some(item => item.id === id));

    return id;
  }
}

module.exports = CartManager;
module.exports = { CartManager, CartNotFoundError };