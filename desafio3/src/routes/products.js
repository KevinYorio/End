const express = require('express');
const router = express.Router();

module.exports = (productCtrl) => {
  router.get('/', productCtrl.getProducts.bind(productCtrl));
  router.get('/:pid', productCtrl.getProductById.bind(productCtrl));
  router.post('/', productCtrl.addProduct.bind(productCtrl));
  router.put('/:pid', productCtrl.updateProduct.bind(productCtrl));
  router.delete('/:pid', productCtrl.deleteProduct.bind(productCtrl));

  return router;
};
