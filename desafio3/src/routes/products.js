const express = require('express');
const productControllerInitializer = require('../Controllers/productController');  
const productRouter = express.Router();
const socketIO = require('socket.io');

const io = socketIO();

const productController = productControllerInitializer(io); 

productRouter.get('/', productController.controllerGetProducts);
productRouter.get('/:pid', productController.controllerGetProductById);
productRouter.post('/', productController.controllerAddProduct);
productRouter.put('/:pid', productController.controllerUpdateProduct);
productRouter.delete('/:pid', productController.controllerDeleteProduct);

module.exports = productRouter;
