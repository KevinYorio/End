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
    } catch (error) {
      throw new Error('Error creating cart');
    }
  }

  async getCartById(cartId) {
    try {
    } catch (error) {
      throw new CartNotFoundError('Cart not found');
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
    } catch (error) {
      throw new CartNotFoundError('Cart not found');
    }
  }

  async loadCarts() {
    try {
    } catch (error) {
      return [];
    }
  }

  async saveCarts(carts) {
    try {
    } catch (error) {
      throw new Error('Error saving carts');
    }
  }

  generateUniqueId(allItems) {
  }
}

module.exports = { CartManager, CartNotFoundError };
