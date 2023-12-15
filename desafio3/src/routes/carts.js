const express = require('express');
const router = express.Router();
const CartController = require('../Controllers/cartController');
const cartCtrl = new CartController(cartManager);

router.post('/', cartCtrl.createCart.bind(cartCtrl));
router.get('/:cid', cartCtrl.getCartById.bind(cartCtrl));
router.post('/:cid/product/:pid', cartCtrl.addProductToCart.bind(cartCtrl));

module.exports = router;