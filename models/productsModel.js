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

const upDateProduct = async (id, name, quantity) => {
  const [response] = await connection.execute(
    `UPDATE StoreManager.products 
    SET id = ?, name = ?, quantity = ?
    WHERE id = ?`,
    [id, name, quantity, id],
  );

  return response;
};

const deleteProduct = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.products 
    WHERE id = ?`,
    [id],
  );
};

module.exports = {
  getAll,
  getByProductId,
  createNewProduct,
  upDateProduct,
  deleteProduct,
};