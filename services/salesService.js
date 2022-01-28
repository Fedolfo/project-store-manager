const salesModel = require('../models/salesModel');
const productService = require('./productService');

const createSales = async (sales) => salesModel.create(sales);

const updateProductQuantity = async (sales) => {
  const updateQuantity = sales.map(async (sale) => {
    const { product_id: id, quantity: saleQuantity } = sale;

    const product = await productService.findByIdProduct(id);
    product.quantity -= saleQuantity;

    await productService.updateProduct(product);
  });
  await Promise.all(updateQuantity);

  const createSale = await createSales(sales);

  return createSale;
};

module.exports = {
  createSales: updateProductQuantity,
};