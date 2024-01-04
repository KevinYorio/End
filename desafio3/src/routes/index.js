const express = require('express');
const productRoutes = require('./products');
const cartRoutes = require('./carts');

const router = express.Router();


router.use('/api/products', productRoutes);


router.use('/api/carts', cartRoutes);

router.get('/', (req, res) => {
    res.render('home'); 
  });

module.exports = router;
