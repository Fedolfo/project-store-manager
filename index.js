require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const errorDomain = require('./middlewares/error');
const products = require('./controllers/routesProduct');
const sales = require('./controllers/routesSales');

const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.use('/sales', sales);

app.use(errorDomain);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
