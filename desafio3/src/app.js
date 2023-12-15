const express = require('express');
const ProductManager = require('./productmanager');
const CartManager = require('./cartmanager');
const ProductController = require('./Controllers/productController');

const app = express();
const port = 8080;

const productManager = new ProductManager();
const cartManager = new CartManager();

const productCtrl = new ProductController(productManager);

app.use(express.json());

const productRouter = require('./routes/products')(productCtrl);
app.use('/api/products', productRouter);

const cartRouter = require('./routes/carts')(cartCtrl);
app.use('/api/carts', cartRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
