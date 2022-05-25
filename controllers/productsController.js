const services = require('../services/productsService');

const getAll = async (_req, res) => {
  const products = await services.getAll();

  res.status(200).json(products);
};

const getByProductId = async (req, res, _next) => {
  const { id } = req.params;

  const product = await services.getByProductId(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getByProductId,
};