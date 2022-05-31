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

const createNewProduct = async (name, quantity) => {
  const allProducts = await getAll();
  
  if (allProducts.some((item) => item.name === name)) return null;
  
  const response = await models.createNewProduct(name, quantity);

  const newProduct = {
    id: response.insertId,
    name,
    quantity,
  };

  return newProduct;
};

const upDateProduct = async (id, name, quantity) => {
  const allProducts = await getAll();
  
  if (allProducts.every((item) => item.id !== id)) return null;

  await models.upDateProduct(id, name, quantity);

  return true;
};

const deleteProduct = async (id) => {
  const allProducts = await getAll();
  
  if (!allProducts.some((item) => item.id === id)) return null;

  await models.deleteProduct(id);

  return true;
};

module.exports = {
  getAll,
  getByProductId,
  createNewProduct,
  upDateProduct,
  deleteProduct,
};