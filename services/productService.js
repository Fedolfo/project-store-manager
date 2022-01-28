const productModel = require('../models/productModel');

const verifyIdProduct = async (id) => {
  const verifyProduct = await productModel.getAllProducts();
  return verifyProduct.filter((product) => Number(product.id) === Number(id));
};

const getAllProducts = async () => productModel.getAllProducts();

const createProduct = async (name, quantity) => {
  const product = await productModel.create(name, quantity);
  return product;
};

const findByIdProduct = async (id) => {
  const getByid = await productModel.getById(id);
  return getByid;
};

const updateProduct = async (id, name, quantity) => {
  const checkIdProduct = await verifyIdProduct(id);
  if (checkIdProduct.length === 0) {
    return { code: 404, message: 'Product not found' };
  }

  return productModel.update(id, name, quantity);
};

const removeProduct = async (id) => {
  const checkIdProduct = await verifyIdProduct(id);
  if (checkIdProduct.length === 0) {
    return { code: 404, message: 'Product not found' };
  }
  await productModel.remove(id);

  return checkIdProduct;
};

module.exports = {
  getAllProducts,
  createProduct,
  findByIdProduct,
  updateProduct,
  removeProduct,
};