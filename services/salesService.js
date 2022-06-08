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

const getBySaleId = async (saleId) => {
  const response = await models.getBySaleId(saleId);

  if (response.length === 0) return null;

  return response.map(serialize);
};

const createNewSales = async (sales) => { 
  const { insertId } = await models.insertTableSales();

  const allSales = sales; 

  const registerNewSales = async ({ productId, quantity }) => {
    await models.insertTableSalesProducts(insertId, productId, quantity);
  };

  allSales.map(registerNewSales);

  const newSales = {
    id: insertId,
    itemsSold: allSales,
  };

  return newSales;
};

const upDateSale = async (id, productId, quantity) => {
  const allSales = await getAll();

  if (allSales.every((item) => item.saleId !== id)) return null;

  await models.upDateTableSales(id);

  await models.upDateTableSalesProducts(id, productId, quantity);

  const updateSales = {
    saleId: id,
    itemUpdated: [
      {
        productId,
        quantity,
      },
    ],
  };

  return updateSales;
};

const deleteSale = async (id) => {
  const allSales = await getAll();

  if (allSales.every((item) => item.sale_Id !== id)) return null;

  await models.deleteTableSales(id);
  await models.deleteTableSalesProducts(id);

  return true;
};

module.exports = {
  getAll,
  getBySaleId,
  createNewSales,
  upDateSale,
  deleteSale,
};