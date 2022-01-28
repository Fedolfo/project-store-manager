const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StorageManager.products;';
  const [allProducts] = await connection.execute(query);
  return allProducts;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StorageManager.products (name, quantity) VALUES (?, ?)';
  const [result] = await connection.execute(query, [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const getById = async (id) => {
  const query = 'SELECT * FROM StorageManager.products WHERE id = ?';

  const [result] = await connection.execute(query, [id]);

  return result[0];
};

const update = async (id, name, quantity) => {
  const query = 'UPDATE StorageManager.products SET name = ?, quantity = ? WHERE id = ?';

  const [rows] = await connection.execute(query, [name, quantity, id]);

  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const remove = async (id) => {
  const query = 'DELETE FROM StorageManager.products WHERE id = ?';

  await connection.execute(query, [id]);
};

module.exports = {
  getAllProducts,
  create,
  getById,
  update,
  remove,
};