const models = require('../models/salesModel');

const serialize = (item) => ({
  saleId: item.sale_Id,
  date: item.date,
  productId: item.product_Id,
  quantity: item.quantity,
});

const getAll = async () => {
  const response = await models.getAll();

  return response.map(serialize);
};

module.exports = {
  getAll,
};