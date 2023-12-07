const fs = require('fs').promises;

class ProductManager {
  constructor() {
    this.productsFile = './src/products.json'; 
  }

  async getProducts(limit) {
    const allProducts = await this.loadProducts();
    return limit ? allProducts.slice(0, limit) : allProducts;
  }

  async getProductById(productId) {
    const allProducts = await this.loadProducts();
    const product = allProducts.find(p => p.id === productId);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(this.productsFile, 'utf-8');
      const products = JSON.parse(data);
      return products;
    } catch (error) {
      throw new Error('Error loading products');
    }
  }
}

module.exports = ProductManager;
