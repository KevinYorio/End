const path = require('path');
const fs = require('fs').promises;

class ProductNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductNotFoundError';
  }
}

class ProductManager {
  constructor() {
    this.productsFile = path.join(__dirname, 'json', 'products.json');
  }

  async addProduct(newProduct) {
    try {
    } catch (error) {
      throw new Error('Error adding product');
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
    } catch (error) {
      throw new ProductNotFoundError('Product not found');
    }
  }
  
  async deleteProduct(productId) {
    try {
    } catch (error) {
      throw new ProductNotFoundError('Product not found');
    }
  }

  async getProducts(limit) {
    try {
    } catch (error) {
      throw new Error('Error loading products');
    }
  }

  async getProductById(productId) {
    try {
    } catch (error) {
      throw new ProductNotFoundError('Product not found');
    }
  }

  async loadProducts() {
    try {
    } catch (error) {
      throw new Error('Error loading products');
    }
  }
}

module.exports = { ProductManager, ProductNotFoundError };
