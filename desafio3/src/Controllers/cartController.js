
const { CartController } = require('../Class/cartmanager');

class CartController {
  constructor(productManager, io) {  
    this.productManager = productManager;  
    this.io = io;
  }

  async createCart(req, res) {
    try {
      const newCart = req.body;
      const cart = await this.productManager.createCart(newCart);  
      res.json({ cart });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const cartId = req.params.cid;
      const cart = await this.productManager.getCartById(cartId);  
      res.json({ cart });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const quantity = req.body.quantity || 1;
      const addedProduct = await this.productManager.addProductToCart(cartId, productId, quantity); 
      res.json({ addedProduct });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = CartController;
