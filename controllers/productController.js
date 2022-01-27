const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
};

const findByIdProduct = async (req, res) => {
  const { id } = req.params;
  const getById = await productService.findByIdProduct(id);

  if (getById.message) {
    return res.status(getById.code).json(getById.message);
  }

  res.status(200).json(getById);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const createSucess = await productService.createProduct(name, quantity);
  if (createSucess.message) {
    return res.status(createSucess.code).json({ message: createSucess.message });
  }

  res.status(201).json(createSucess);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateStore = await productService.updateProduct(id, name, quantity);

  res.status(200).json(updateStore);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  await productService.removeProduct(id);
  res.status(204).end();
};

module.exports = {
  getAllProducts,
  createProduct,
  findByIdProduct,
  updateProduct,
  removeProduct,
};