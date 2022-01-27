const productModel = require('../models/productModel');
const error = require('../utils/validations');

const verifyIfProductExists = async (name) => {
  const verifyProduct = await productModel.getAllProducts();
  return verifyProduct.find((product) => product.name === name);
};

const verifyIdForUpdateProduct = async (id) => {
  const verifyProduct = await productModel.getAllProducts();
  return verifyProduct.filter((product) => Number(product.id) === Number(id));
};

const getAllProducts = async () => productModel.getAllProducts();

const createProduct = async (name, quantity) => {
  const checkProduct = await verifyIfProductExists(name);
  const checkError = error(name, quantity);

  if (checkProduct !== undefined) {
    return ({ code: 409, message: 'Product already exists' });
  }

  if (checkError.message) {
    return checkError;
  }
  const product = await productModel.create(name, quantity);

  return product;
};

const findByIdProduct = async (id) => {
  const getByid = await productModel.getById(id);

  if (!getByid) {
    return { code: 404, message: 'Product not found' };
  }

  return getByid;
};

const updateProduct = async (id, name, quantity) => {
  const checkIdProduct = verifyIdForUpdateProduct(id);
  const checkError = error(name, quantity);

  if (checkIdProduct.length === 0) {
    return { code: 404, message: 'Product not found' };
  }

  if (checkError.message) {
    return checkError;
  }

  return productModel.update(id, name, quantity);
};

const removeProduct = async (id) => {
  const getRemove = await productModel.remove(id);
  return getRemove;
};

module.exports = {
  getAllProducts,
  createProduct,
  findByIdProduct,
  updateProduct,
  removeProduct,
};