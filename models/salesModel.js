const connection = require('./connection');
// https://github.com/tryber/sd-014-c-store-manager/pull/59 referência: Gessé Carlos
const create = async (sales) => {
  const [row] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  const salesProducts = sales.map(async ({ product_id: productId, quantity }) => {
    await connection.execute(
      `INSERT INTO sales_products
        (sale_id, product_id, quantity)
        VALUES (?, ?, ?)
      `,
      [row.insertId, productId, quantity],
    );
  });
  await Promise.all(salesProducts);

  return row;
};

module.exports = {
  create,
};