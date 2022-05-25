const services = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await services.getAll();

  res.status(200).json(sales);
};

module.exports = {
  getAll,
};