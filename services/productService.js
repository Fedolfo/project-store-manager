// importamos o modelo de products
const productModel = require('../models/productModel');
// Services: Arquitetura REST
const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  return { code: 200, data: products };
};

const createProduct = async (name, quantity) => {
  const product = await productModel.create(name, quantity);
  return { code: 201, data: product };
};

const findByIdProduct = async (id) => {
  const getByid = await productModel.getById(id);

  if (!getByid) return { code: 404, data: { message: 'Product not found' } };

  return { code: 404, data: getByid };
};
// verifica se o produto existe, função assistente para validação;
const verifyIdProduct = async (id) => {
  const verifyProduct = await productModel.getAllProducts();
  return verifyProduct.filter((product) => Number(product.id) === Number(id));
};

const updateProduct = async (id, name, quantity) => {
  const product = await productModel.update(id, name, quantity);
  const checkIdProduct = await verifyIdProduct(id);

  if (checkIdProduct.length === 0) {
    return {
      code: 404, data: { message: 'Product not found' },
    };
  }
  return { code: 200, data: product };
};

const removeProduct = async (id) => {
  const checkIdProduct = await verifyIdProduct(id);
  if (checkIdProduct.length === 0) {
    return { code: 404, data: { message: 'Product not found' } };
  }
  await productModel.remove(id);

  return { code: 200, data: checkIdProduct[0] };
};

module.exports = {
  verifyIdProduct,
  getAllProducts,
  createProduct,
  findByIdProduct,
  updateProduct,
  removeProduct,
};