const checkName = (value) => !value;
const checkQuantity = (value) => value === undefined;

const checkQuantityValue = (quantity) => Number(quantity) <= 0 || typeof quantity === 'string';
const checkNameLength = (name) => name.length < 5;

module.exports = (name, quantity) => {
  switch (true) {
    case checkName(name):
      return { code: 400, message: '"name" is required' };
    case checkQuantity(quantity):
      return { code: 400, message: '"quantity" is required' };
    case checkNameLength(name):
      return {
        code: 422, message: '"name" length must be at least 5 characters long',
      };
    case checkQuantityValue(quantity):
      return {
        code: 422, message: '"quantity" must be a number larger than or equal to 1',
      };
    default:
      return false;
  }
};