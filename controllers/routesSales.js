const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const validationSales = require('../middlewares/validationsSales');
const { getAll, create, update, findById } = require('./salesController');

const { validateProductId, validateSales } = validationSales;

router.get('/', rescue(getAll));

router.post('/',
  validateProductId,
  validateSales,
  rescue(create));

router.get('/:id', rescue(findById));

router.put('/:id',
  validateSales,
  validateProductId,
  rescue(update));

module.exports = router;