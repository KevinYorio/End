class ProductController {
    constructor(productManager) {
      this.productManager = productManager;
    }
  
    async getProducts(req, res) {
      try {
        const limit = req.query.limit;
        const products = await this.productManager.getProducts(limit);
        res.json({ products });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
    async getProductById(req, res) {
      try {
        const productId = req.params.pid;
        const product = await this.productManager.getProductById(productId);
        res.json({ product });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  
    async addProduct(req, res) {
      try {
        const newProduct = req.body;
        const product = await this.productManager.addProduct(newProduct);
        res.json({ product });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async updateProduct(req, res) {
      try {
        const productId = req.params.pid;
        const updatedProduct = req.body;
        const product = await this.productManager.updateProduct(productId, updatedProduct);
        res.json({ product });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  
    async deleteProduct(req, res) {
      try {
        const productId = req.params.pid;
        await this.productManager.deleteProduct(productId);
        res.json({ message: 'Product deleted successfully' });
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    }
  }
  
  module.exports = new ProductController();
  