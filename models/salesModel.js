const connection = require('./connection');
// https://github.com/tryber/sd-014-c-store-manager/pull/59 referência: Gessé Carlos
const create = async (sales) => {
  const [row] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  Promise.all(
    sales.map(async (product) => {
      connection.execute(
        'INSERT INTO sales_products (sale_id,product_id, quantity) VALUES (?,?,?);',
        [row.insertId, product.product_id, product.quantity],
      );
    }),
  );
  return { id: row.insertId, itemsSold: sales };
};

module.exports = {
  create,
};