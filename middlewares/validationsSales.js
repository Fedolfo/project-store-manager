const validateProductId = (req, res, next) => {
  if (!req.body.some((sale) => sale.product_id)) {
    return res.status(400)
      .json({ message: '"product_id" is required' });
  }

  next();
};

const validateSales = (req, res, next) => {
  if (req.body.some((sale) => sale.quantity <= 0)) {
    return res.status(422)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  if (!req.body.some(({ quantity }) => quantity && quantity !== 0)) {
    return res.status(400)
      .json({ message: '"quantity" is required' });
  }

  if (req.body.some(({ quantity }) => typeof quantity !== 'number')) {
    return res.status(422)
      .json({ message: '"quantity" must be a number larger than or equal to 1' });
  }

  next();
};

module.exports = {
  validateProductId,
  validateSales,
};