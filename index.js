require('dotenv').config();
const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');
const storeController = require('./controllers/storeController');

const app = express();
// não remova esse endpoint, e para o avaliador funcionar
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', rescue(storeController.create));

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
