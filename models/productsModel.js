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

const createNewProduct = async (name, quantity) => {
  const [response] = await connection.execute(
    `INSERT INTO StoreManager.products (name, quantity)
    VALUES(?, ?)`,
    [name, quantity],
  );

  return response;
};

module.exports = {
  getAll,
  getByProductId,
  createNewProduct,
};