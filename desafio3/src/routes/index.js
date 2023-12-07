const express = require('express');
const productRoutes = require('./products');
const cartRoutes = require('./carts');

const router = express.Router();

// Rutas de Productos
router.use('/api/products', productRoutes);

// Rutas de Carritos
router.use('/api/carts', cartRoutes);

module.exports = router;
