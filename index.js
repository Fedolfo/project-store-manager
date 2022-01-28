require('dotenv').config();
const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');
const validationSales = require('./middlewares/validationsSales');
const validationProducts = require('./middlewares/validationsProduct');

const { validateName, validateQuantity } = validationProducts;
const { validateProductId, validateSales } = validationSales;
const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productController.getAllProducts));

app.get('/products/:id', rescue(productController.findByIdProduct));

app.post('/products',
  validateName,
  validateQuantity,
  rescue(productController.createProduct));

app.put('/products/:id',
  validateQuantity,
  validateName,
  rescue(productController.updateProduct));

app.delete('/products/:id', rescue(productController.removeProduct));

app.post('/sales',
  validateProductId,
  validateSales,
  rescue(salesController.createSales));

app.get('/sales', rescue(salesController.getAllSales));

app.get('/sales/:id', rescue(salesController.findByIdProduct));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
