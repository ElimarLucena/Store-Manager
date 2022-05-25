const connection = require('../dbConnection/connection');

const getAll = async () => {
  const [response] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );

  return response;
};

module.exports = {
  getAll,
};