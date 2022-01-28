const salesService = require('../services/salesService');

const createSales = async (req, res) => {
  const sales = await salesService.createSales(req.body);

  res.status(201).json({
    id: sales.insertId,
    itemsSold: req.body,
  });
};

module.exports = {
  createSales,
};