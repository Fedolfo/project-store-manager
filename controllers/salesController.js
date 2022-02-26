const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const { code, data } = await salesService.getlAllSales();
  res.status(code).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const { code, data } = await salesService.findByIdSales(id);

  res.status(code).json(data);
};

const create = async (req, res) => {
  const products = req.body;

  const { code, data } = await salesService.createSales(products);

  res.status(code).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const products = req.body;

  const { code, data } = await salesService.updateSales(id, products);

  res.status(code).json(data);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};