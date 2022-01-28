const connection = require('./connection');
// https://github.com/tryber/sd-014-c-store-manager/pull/59 referência: Gessé Carlos
const create = async (salesCreate) => {
  const queryDate = 'INSERT INTO sales (date) VALUES (NOW())';
  const [date] = await connection.execute(queryDate);

  salesCreate.forEach(async ({ product_id: productId, quantity }) => {
    const [query] = `INSERT INTO sales_products
        (sale_id, product_id, quantity)
        VALUES (?, ?, ?)`;
    await connection.execute(query,
      [date.insertId, productId, quantity]);
  });

  return {
    id: date.insertId, itemsSold: salesCreate,
  };
};

module.exports = {
  create,
};