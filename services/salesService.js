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

const updateSales = async (id, products) => {
  await findByIdSales(Number(id));
  await Promise.all(
    products.map(async (product) => {
      await productService.findByIdProduct(product.product_id);
    }),
  );
  const upSales = await salesModel.update(id, products);
  return upSales;
};

module.exports = {
  getlAllSales,
  createSales,
  findByIdSales,
  updateSales,
};