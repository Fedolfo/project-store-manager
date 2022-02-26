const salesModel = require('../models/salesModel');
const productService = require('./productService');

const getlAllSales = async () => {
  const sales = await salesModel.getAll();
  return { code: 200, data: sales };
};

const createSales = async (products) => {
  await Promise.all(
    products.map(async (product) => {
      await productService.findByIdProduct(product.product_id);
    }),
  );
  const addSale = await salesModel.create(products);
  return { code: 201, data: addSale };
};

const findByIdSales = async (id) => {
  const result = await salesModel.getById(id);
  if (result[0] === undefined) {
    return { code: 404, data: { message: 'Sale not found' } };
  }
  return { code: 200, data: result };
};

const updateSales = async (id, products) => {
  await findByIdSales(Number(id));
  await Promise.all(
    products.map(async (product) => {
      await productService.findByIdProduct(product.product_id);
    }),
  );
  const upSales = await salesModel.update(id, products);
  return { code: 200, data: upSales };
};

module.exports = {
  getlAllSales,
  createSales,
  findByIdSales,
  updateSales,
};