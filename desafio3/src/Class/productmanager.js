const path = require('path');
const fs = require('fs').promises;

class ProductNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductNotFoundError';
  }
}

class ProductManager {
  constructor(io) {
    this.productsFile = path.join(__dirname, 'json', 'products.json');
    this.io = io;
  }

  async addProduct(newProduct) {
    try {
      const products = await this.loadProducts();
      newProduct.id = (products.length + 1).toString();
      products.push(newProduct);
      await this.saveProducts(products);
      this.io.emit('productAdded', { product: newProduct });
      return newProduct;
    } catch (error) {
      throw new Error('Error adding product');
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      const products = await this.loadProducts();
      const productIndex = products.findIndex(product => product.id === productId);
      if (productIndex === -1) {
        throw new ProductNotFoundError('Product not found');
      }
      products[productIndex] = { ...products[productIndex], ...updatedProduct };
      await this.saveProducts(products);
      return products[productIndex];
    } catch (error) {
      throw new ProductNotFoundError('Product not found');
    }
  }

  async deleteProduct(productId) {
    try {
      const products = await this.loadProducts();
      const updatedProducts = products.filter(product => product.id !== productId);
      if (updatedProducts.length === products.length) {
        throw new ProductNotFoundError('Product not found');
      }
      await this.saveProducts(updatedProducts);
      return;
    } catch (error) {
      throw new ProductNotFoundError('Product not found');
    }
  }

  async getProducts(limit) {
    try {
      const products = await this.loadProducts();
      const limitedProducts = limit ? products.slice(0, parseInt(limit)) : products;
      return limitedProducts;
    } catch (error) {
      throw new Error('Error loading products');
    }
  }

  async getProductById(productId) {
    try {
      const products = await this.loadProducts();
      const product = products.find(product => product.id === productId);
      if (!product) {
        throw new ProductNotFoundError('Product not found');
      }
      return product;
    } catch (error) {
      throw new ProductNotFoundError('Product not found');
    }
  }

  async loadProducts() {
    try {
      const productsJson = await fs.readFile(this.productsFile, 'utf-8');
      return JSON.parse(productsJson);
    } catch (error) {
      throw new Error('Error loading products');
    }
  }

  async saveProducts(products) {
    try {
      const productsJson = JSON.stringify(products, null, 2);
      await fs.writeFile(this.productsFile, productsJson, 'utf-8');
    } catch (error) {
      throw new Error('Error saving products');
    }
  }
}

module.exports = { ProductManager, ProductNotFoundError };
