const { CartController, cartCtrl } = require('../Controllers/cartController');
const express = require('express');

const router = express.Router();

router.post('/', cartCtrl.createCart.bind(cartCtrl));
router.get('/:cid', cartCtrl.getCartById.bind(cartCtrl));
router.post('/:cid/product/:pid', cartCtrl.addProductToCart.bind(cartCtrl));

module.exports = router;