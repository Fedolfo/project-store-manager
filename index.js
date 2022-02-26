require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const errorDomain = require('./middlewares/error');
const products = require('./controllers/routesProduct');
const sales = require('./controllers/routesSales');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
/* Aqui é retornado toda API, podendo entrar nela para usar para o front-end
  usando domínios(servidores para fazer deploy) */
app.use('/products', products);

app.use('/sales', sales);

app.use(errorDomain);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
