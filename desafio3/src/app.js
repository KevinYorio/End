const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars'); 
const path = require('path'); 
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const { CartController } = require('./Controllers/cartController');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const productManager = require('./Class/productmanager');
const productManager = new productManager();

const hbs = exphbs.create({ defaultLayout: 'main', extname: '.handlebars' }); 
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static('public'));



/* Lista de productos
const products = [
  {
    "id": "101",
    "name": "Laptop HP Pavilion",
    "price": 899.99
  },
  {
    "id": "102",
    "name": "Smartphone Samsung Galaxy S21",
    "price": 999.99
  },
  {
    "id": "103",
    "name": "Smart TV LG OLED C1",
    "price": 1499.99
  },
  {
    "id": "104",
    "name": "Canon EOS R5 Camera",
    "price": 3499.99
  },
  {
    "id": "105",
    "name": "Apple MacBook Pro 13-inch",
    "price": 1299.99
  },
  {
    "id": "106",
    "name": "Dyson V11 Vacuum Cleaner",
    "price": 599.99
  },
  {
    "id": "107",
    "name": "Bose QuietComfort 35 II Headphones",
    "price": 299.99
  },
  {
    "id": "108",
    "name": "Nintendo Switch Console",
    "price": 299.99
  },
  {
    "id": "109",
    "name": "Fitbit Charge 5 Fitness Tracker",
    "price": 179.99
  },
  {
    "id": "110",
    "name": "KitchenAid Stand Mixer",
    "price": 349.99
  }
]; */

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes); 

app.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { title: 'Home', products });  // Pasar la lista de productos al renderizar la vista 'home'
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts');  
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('productAdded', async (data) => {
    const newProduct = {
      name: data.productName,
      price: data.productPrice
    }
    const products = await productManager.addProduct(newProduct);
    io.emit('updateProducts', products);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
