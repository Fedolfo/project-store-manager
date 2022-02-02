const express = require('express');
const rescue = require('express-rescue');
const validationProducts = require('../middlewares/validationsProduct');
const { getAll, findById, create, update, remove } = require('./productController');

const { validateName, validateQuantity } = validationProducts;

const router = express.Router();

router.get('/', rescue(getAll));

router.get('/:id', rescue(findById));

router.post('/',
  validateName,
  validateQuantity,
  rescue(create));

router.put('/:id',
  validateQuantity,
  validateName,
  rescue(update));

router.delete('/:id', rescue(remove));

module.exports = router;