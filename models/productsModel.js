const connection = require('../dbConnection/connection');

const getAll = async () => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return response;
};

const getByProductId = async (productId) => {
  const [response] = await connection.execute(
    `SELECT * FROM StoreManager.products 
    WHERE id = ? 
    ORDER BY id ASC;`,
    [productId],
  );

  return response;
};

module.exports = {
  getAll,
  getByProductId,
};