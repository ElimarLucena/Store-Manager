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

  return res.status(200).json(product[0]);
};

const createNewProduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await services.createNewProduct(name, quantity);

  if (!product) {
    return res.status(409).json({ message: 'Product already exists' });
  }

  return res.status(201).json(product);
};

const upDateProduct = async (req, res) => {
  const { id } = req.params;

  const { name, quantity } = req.body;

  const product = await services.upDateProduct(Number(id), name, quantity);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const upDatedProduct = { id: Number(id), name, quantity };

  return res.status(200).json(upDatedProduct);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await services.deleteProduct(Number(id));

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(204).json();
};

module.exports = {
  getAll,
  getByProductId,
  createNewProduct,
  upDateProduct,
  deleteProduct,
};