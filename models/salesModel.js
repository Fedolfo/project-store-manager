const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sales_products.sale_id AS saleId, sales.date,
  sales_products.product_id,
  sales_products.quantity FROM sales_products
  INNER JOIN sales
  ON sales_products.sale_id = sales.id`;

  const [result] = await connection.execute(query);

  return result;
};

const create = async (sales) => {
  const [row] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  Promise.all(
    sales.map(async (product) => {
      connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?,?,?);',
        [row.insertId, product.product_id, product.quantity],
      );
    }),
  );

  return { id: row.insertId, itemsSold: sales };
};

const getById = async (id) => {
  const query = `SELECT sales.date,
  sales_products.product_id,
  sales_products.quantity FROM sales_products
  INNER JOIN sales
  ON sales_products.sale_id = sales.id
  WHERE sales.id = ?;
  `;

  const [result] = await connection.execute(query, [id]);

  if (!result) return null;

  return result;
};

const update = async (id, products) => {
  const query = 'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?';

  const [{ product_id: productId, quantity }] = products;

  const [result] = await connection.execute(query, [productId, quantity, Number(id)]);

  if (!result) return null;

  return { saleId: id, itemUpdated: products };
};

module.exports = {
  getAll,
  create,
  getById,
  update,
};