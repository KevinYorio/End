const express = require('express');
const router = express.Router();
const ProductManager = require('../productmanager');
const ProductController = require('../Controllers/productController');

const productRouter = express.Router();
const productmanager = new ProductManager();
const productCtrl = new ProductController(productmanager);

productRouter.get('/', productCtrl.getProducts.bind(productCtrl));
productRouter.get('/:pid', productCtrl.getProductById.bind(productCtrl));
productRouter.post('/', productCtrl.addProduct.bind(productCtrl));
productRouter.put('/:pid', productCtrl.updateProduct.bind(productCtrl)); // Agregado
productRouter.delete('/:pid', productCtrl.deleteProduct.bind(productCtrl)); // Agregado

module.exports = productRouter;