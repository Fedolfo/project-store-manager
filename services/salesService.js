const salesModel = require('../models/salesModel');
const productService = require('./productService');

const createSales = async (products) => {
  await Promise.all(
    products.map(async (product) => {
      await productService.findByIdProduct(product.product_id);
    }),
  );
  const addSale = await salesModel.create(products);
  return addSale;
};

module.exports = {
  createSales,
};