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

const productManager = require('./Class/cartmanager');
const cartCtrl = new CartController(productManager, io);


const hbs = exphbs.create({ defaultLayout: 'main', extname: '.handlebars' }); 
app.engine('handlebars', hbs.engine); 
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static('public'));

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes); 

app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });  
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts');  
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
