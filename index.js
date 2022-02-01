require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const errorDomain = require('./middlewares/error');
const products = require('./controllers/productController');
const sales = require('./controllers/salesController');

const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.use('/sales', sales);

// app.get('/products', rescue(productController.getAllProducts));

// app.get('/products/:id', rescue(productController.findByIdProduct));

// app.post('/products',
//   validateName,
//   validateQuantity,
//   rescue(productController.createProduct));

// app.put('/products/:id',
//   validateQuantity,
//   validateName,
//   rescue(productController.updateProduct));

// app.delete('/products/:id', rescue(productController.removeProduct));

// app.post('/sales',
//   validateProductId,
//   validateSales,
//   rescue(salesController.createSales));

// app.get('/sales', rescue(salesController.getAllSales));

// app.get('/sales/:id', rescue(salesController.findByIdProduct));

// app.put('/sales/:id',
//   validateSales,
//   validateProductId,
//   rescue(salesController.updateSales));

app.use(errorDomain);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
