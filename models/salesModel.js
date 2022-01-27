const connection = require('./connection');

const salesCreate = async ({ id, date }) => {
  const query = `INSERT INTO sales (id, date)
  SELECT
  VALUES (?, ?)`;
  const [result] = await connection.execute(query, [id, date]);

  return {
    id: result.insertId,
    date,
  };
};

module.exports = {
  salesCreate,
};