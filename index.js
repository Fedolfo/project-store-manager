require('dotenv').config();
const express = require('express');
// const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');

const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', (productController.getAllProducts));
app.get('/products/:id', (productController.findByIdProduct));
app.post('/products', (productController.createProduct));
app.put('/products/:id', (productController.updateProduct));
app.delete('/products/:id', (productController.removeProduct));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
