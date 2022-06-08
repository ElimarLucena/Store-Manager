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

const createNewSales = async (req, res) => {
  const sales = await services.createNewSales(req.body);

  return res.status(201).json(sales);
};

const upDateSale = async (req, res) => {
  const { id } = req.params;

  const [{ productId, quantity }] = req.body;

  const sale = await services.upDateSale(Number(id), productId, quantity);

  if (sale === null) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const sale = await services.deleteSale(Number(id));

  if (!sale) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  return res.status(204).send();
};

module.exports = {
  getAll,
  getBySaleId,
  createNewSales,
  upDateSale,
  deleteSale,
};