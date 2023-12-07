class CartController {
    constructor(cartManager) {
      this.cartManager = cartManager;
    }
  
    async createCart(req, res) {
      try {
        const newCart = req.body;
        const cart = await this.cartManager.createCart(newCart);
        res.json({ cart });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getCartById(req, res) {
      try {
        const cartId = req.params.cid;
        const cart = await this.cartManager.getCartById(cartId);
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
        const addedProduct = await this.cartManager.addProductToCart(cartId, productId, quantity);
        res.json({ addedProduct });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = CartController;
  