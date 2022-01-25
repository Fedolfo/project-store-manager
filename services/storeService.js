const storeModel = require('../models/storeModel');

const create = async ({ name, quantity }) => {
  const { id } = await storeModel
    .create({ name, quantity });

  return {
    id,
  };
};

module.exports = {
  create,
};