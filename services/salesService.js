const salesModel = require('../models/salesModel');

const createSales = async (sales) => salesModel.create(sales);

module.exports = {
  createSales,
};