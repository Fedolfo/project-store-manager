const Joi = require('joi');
const storeService = require('../services/storeService');

const create = async (req, res, next) => {
  const { name, quantity } = req.body;
  const createSucess = await storeService.create(name, quantity);

  const { error } = Joi.object.keys({
    name: Joi.string().alphanum().min(5).required(),
    quantity: Joi.integer().number().greater(0).required(),
  }).validate(name, quantity);

  if (name) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  if (error) {
    next(error);
  }

  res.status(201).json(createSucess);
};

module.exports = {
  create,
};