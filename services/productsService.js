const models = require('../models/productsModel');

const getAll = async () => {
  const response = await models.getAll();

  return response;
};

module.exports = {
  getAll,
};