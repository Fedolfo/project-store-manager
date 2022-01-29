const productService = require('../services/productService');

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
};

const findByIdProduct = async (req, res) => {
  const { id } = req.params;
  const getById = await productService.findByIdProduct(id);

  if (!getById) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(getById);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const createSucess = await productService.createProduct(name, quantity);

  res.status(201).json(createSucess);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateStore = await productService.updateProduct(id, name, quantity);

  const checkIdProduct = await productService.verifyIdProduct(id);
  if (checkIdProduct.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(updateStore);
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productService.removeProduct(id);

  if (deleteProduct.message) {
    return res.status(deleteProduct.code).json({ message: deleteProduct.message });
  }

  res.status(200).json(deleteProduct[0]);
};

module.exports = {
  getAllProducts,
  createProduct,
  findByIdProduct,
  updateProduct,
  removeProduct,
};