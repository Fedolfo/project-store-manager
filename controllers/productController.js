const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const { code, data } = await productService.getAllProducts();
  res.status(code).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await productService.findByIdProduct(id);

  res.status(code).json(data);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;

  const { code, data } = await productService.createProduct(name, quantity);

  res.status(code).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const { code, data } = await productService.updateProduct(id, name, quantity);

  res.status(code).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await productService.removeProduct(id);

  res.status(code).json(data);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};