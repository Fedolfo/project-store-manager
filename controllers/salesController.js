const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
  const allSales = await salesService.getlAllSales();
  res.status(200).json(allSales);
};

const createSales = async (req, res) => {
  const products = req.body;
  const sales = await salesService.createSales(products);
  res.status(201).json(sales);
};

const findByIdProduct = async (req, res) => {
  const { id } = req.params;
  const getById = await salesService.findByIdSales(id);
  if (getById[0] === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(getById);
};

module.exports = {
  getAllSales,
  createSales,
  findByIdProduct,
};