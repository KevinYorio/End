const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/carts');
const handlebars = require('handlebars');
const CartController = require('./Controllers/cartController');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const productManager = require('./Class/cartmanager');
const cartCtrl = new CartController(productManager, io);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use("/api/products", productRoutes(io));
app.use("/api/carts", cartRoutes);  // No necesitas pasar cartCtrl aquí

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('productAdded', (data) => {
    io.emit('updateProducts', data);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
