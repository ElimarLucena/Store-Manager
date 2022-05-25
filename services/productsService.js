const models = require('../models/productsModel');

const getAll = async () => {
  const response = await models.getAll();

  return response;
};

const getByProductId = async (productId) => {
  const response = await models.getByProductId(productId);

  if (response.length === 0) return null;

  return response;
};

module.exports = {
  getAll,
  getByProductId,
};