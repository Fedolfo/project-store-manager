const connection = require('./connection');
/* Nessa função relacionada ao MYSQL, tem a sua funcionalidade de listar
todos os produtos. */
const getAllProducts = async () => {
  const query = 'SELECT * FROM products;';
  const [allProducts] = await connection.execute(query);
  return allProducts;
};
/* Nessa função relacionada ao MYSQL, tem o seu funcionamento
de criar um novo produto para a API */
const create = async (name, quantity) => {
  const query = 'INSERT INTO products (name, quantity) VALUES (?, ?)';
  const [result] = await connection.execute(query, [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};
/* Nessa função relacionada ao MYSQL, tem o seu funcionamento
para listar apenas um produto da API */
const getById = async (id) => {
  const query = 'SELECT * FROM products WHERE id = ?';

  const [result] = await connection.execute(query, [id]);

  return result[0];
};
/* Nessa função relacionada ao MYSQL, tem o seu funcionamento
para atualizar produtos existentes dentro da API, recuperando a listagem
de apenas um produto para ser possivel atualizar */
const update = async (id, name, quantity) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';

  const [rows] = await connection.execute(query, [name, quantity, id]);

  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const remove = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';

  await connection.execute(query, [id]);
};

module.exports = {
  getAllProducts,
  create,
  getById,
  update,
  remove,
};