const salesService = require('../services/salesService');

const createSales = async (req, res) => {
  const products = req.body;
  const sales = await salesService.createSales(products);
  res.status(201).json(sales);
};

module.exports = {
  createSales,
};