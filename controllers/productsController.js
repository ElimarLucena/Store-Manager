const services = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await services.getAll();

  res.status(200).json(products);
};

module.exports = {
  getAll,
};