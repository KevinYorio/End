const express = require('express');
const router = express.Router();

module.exports = (cartCtrl) => {
  router.post('/', cartCtrl.createCart.bind(cartCtrl));
  router.get('/:cid', cartCtrl.getCartById.bind(cartCtrl));
  router.post('/:cid/product/:pid', cartCtrl.addProductToCart.bind(cartCtrl));

  return router;
};
