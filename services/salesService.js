const salesModel = require('../models/salesModel');
const productService = require('./productService');

const getlAllSales = async () => salesModel.getAll();

const createSales = async (products) => {
  await Promise.all(
    products.map(async (product) => {
      await productService.findByIdProduct(product.product_id);
    }),
  );
  const addSale = await salesModel.create(products);
  return addSale;
};

const findByIdSales = async (id) => {
  const result = await salesModel.getById(id);
  return result;
};

module.exports = {
  getlAllSales,
  createSales,
  findByIdSales,
};