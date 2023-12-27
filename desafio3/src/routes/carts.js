const express = require('express');
const { CartController } = require('../Controllers/cartController');
const { CartManager } = require('../Class/cartmanager');
const socketIO = require('socket.io');

const router = express.Router();

const productManager = new CartManager();
const io = socketIO();

const cartCtrl = new CartController(productManager, io);  // Crear una instancia única de CartController

router.post('/', cartCtrl.createCart.bind(cartCtrl));
router.get('/:cid', cartCtrl.getCartById.bind(cartCtrl));
router.post('/:cid/product/:pid', cartCtrl.addProductToCart.bind(cartCtrl));

module.exports = router;
