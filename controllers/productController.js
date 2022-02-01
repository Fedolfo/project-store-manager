const express = require('express');
const rescue = require('express-rescue');
const validationProducts = require('../middlewares/validationsProduct');

const { validateName, validateQuantity } = validationProducts;

const router = express.Router();

const productService = require('../services/productService');

router.get('/', rescue(async (req, res) => {
  const products = await productService.getAllProducts();
  res.status(200).json(products);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const getById = await productService.findByIdProduct(id);

  if (!getById) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.status(200).json(getById);
}));

router.post('/',
  validateName,
  validateQuantity,
  rescue(async (req, res) => {
    const { name, quantity } = req.body;

    const createSucess = await productService.createProduct(name, quantity);

    res.status(201).json(createSucess);
  }));

router.put('/:id',
  validateQuantity,
  validateName,
  rescue(async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const updateStore = await productService.updateProduct(id, name, quantity);

    const checkIdProduct = await productService.verifyIdProduct(id);
    if (checkIdProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updateStore);
  }));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productService.removeProduct(id);

  if (deleteProduct.message) {
    return res.status(deleteProduct.code).json({ message: deleteProduct.message });
  }

  res.status(200).json(deleteProduct[0]);
}));

module.exports = router;