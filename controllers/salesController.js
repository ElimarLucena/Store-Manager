const services = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await services.getAll();

  res.status(200).json(sales);
};

const getBySaleId = async (req, res, _next) => {
  const { id } = req.params;

  const sale = await services.getBySaleId(id);

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(200).json(sale);
};

module.exports = {
  getAll,
  getBySaleId,
};