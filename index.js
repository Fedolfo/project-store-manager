require('dotenv').config();
const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', rescue(productController.getAllProducts));
app.get('/products/:id', rescue(productController.findByIdProduct));
app.post('/products', rescue(productController.createProduct));
app.put('/products/:id', rescue(productController.updateProduct));
app.delete('/products/:id', rescue(productController.removeProduct));

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
