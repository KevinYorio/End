
const express = require('express'); 
const { CartController } = require('../Controllers/cartController');
const { CartManager } = require('../Class/cartmanager');
const socketIO = require('socket.io');


const productManager = new CartManager();
const io = socketIO();

const cartCtrl = new CartController(productManager, io);

const router = express.Router();

router.post('/', cartCtrl.createCart.bind(cartCtrl));
router.get('/:cid', cartCtrl.getCartById.bind(cartCtrl));
router.post('/:cid/product/:pid', cartCtrl.addProductToCart.bind(cartCtrl));

module.exports = router;
