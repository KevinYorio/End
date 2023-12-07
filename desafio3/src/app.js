const express = require('express');
const ProductManager = require('./productmanager');
const CartManager = require('./cartmanager');
const ProductController = require('./Controllers/productController');
const CartController = require('./Controllers/cartController');

const app = express();
const port = 8080;

const productManager = new ProductManager();
const cartManager = new CartManager();

const productCtrl = new ProductController(productManager);
const cartCtrl = new CartController(cartManager);

app.use(express.json());

// Rutas de Productos
app.use('/api/products', productCtrl);
// Rutas de Carritos
app.use('/api/carts', cartCtrl);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
