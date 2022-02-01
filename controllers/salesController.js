const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();
const validationSales = require('../middlewares/validationsSales');

const salesService = require('../services/salesService');

const { validateProductId, validateSales } = validationSales;

router.get('/', rescue(async (_req, res) => {
  const allSales = await salesService.getlAllSales();
  res.status(200).json(allSales);
}));

router.post('/',
  validateProductId,
  validateSales,
  rescue(async (req, res) => {
    const products = req.body;
    const sales = await salesService.createSales(products);
    res.status(201).json(sales);
  }));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const getById = await salesService.findByIdSales(id);
  if (getById[0] === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(getById);
}));

router.put('/:id',
  validateSales,
  validateProductId,
  rescue(async (req, res) => {
    const { id } = req.params;
    const products = req.body;

    const getByUpdate = await salesService.updateSales(id, products);

    res.status(200).json(getByUpdate);
  }));

module.exports = router;