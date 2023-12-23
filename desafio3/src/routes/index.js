const express = require('express');
const productRoutes = require('./products');
const cartRoutes = require('./carts');

const router = express.Router();


router.use('/api/products', productRoutes);


router.use('/api/carts', cartRoutes);

module.exports = router;
