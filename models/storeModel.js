const connection = require('./connection');

const create = async ({ name, quantity }) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES ? ?';
  const [result] = await connection.execute(query, [name, quantity]);

  return {
    id: result.insertId,
  };
};

module.exports = {
  create,
};