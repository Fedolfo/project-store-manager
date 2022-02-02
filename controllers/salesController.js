const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const allSales = await salesService.getlAllSales();
  res.status(200).json(allSales);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const getById = await salesService.findByIdSales(id);
  if (getById[0] === undefined) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(getById);
};

const create = async (req, res) => {
  const products = req.body;
  const sales = await salesService.createSales(products);
  res.status(201).json(sales);
};

const update = async (req, res) => {
  const { id } = req.params;
  const products = req.body;

  const getByUpdate = await salesService.updateSales(id, products);

  res.status(200).json(getByUpdate);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};