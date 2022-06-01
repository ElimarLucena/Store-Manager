const connection = require('../dbConnection/connection');

const getAll = async () => {
  const [response] = await connection.execute(
    `SELECT 
        products.sale_Id,
        sales.date,
        products.product_Id,
        products.quantity
    FROM
        StoreManager.sales_products AS products
            INNER JOIN
        StoreManager.sales AS sales ON products.sale_Id = sales.id;`,
  );

  return response;
};

const getBySaleId = async (saleId) => {
  const [response] = await connection.execute(
    `SELECT 
        sales.date,
        products.product_Id,
        products.quantity
    FROM
        StoreManager.sales_products AS products
            INNER JOIN
        StoreManager.sales AS sales ON products.sale_Id = sales.id
    WHERE
        sale_id = ?;`,
    [saleId],
  );

  return response;
};

const insertTableSales = async () => {
  const [response] = await connection.execute(
    `INSERT INTO StoreManager.sales (date)
    VALUES(NOW())`,
  );

  return response;
};

const insertTableSalesProducts = async (id, productId, quantity) => {
  const [response] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES(?, ?, ?)`,
    [id, productId, quantity],
  );

  return response;
};

const upDateTableSales = async (id) => {
  const [response] = await connection.execute(
    `UPDATE StoreManager.sales
    SET date = (NOW())
    WHERE id = ?`,
    [id],
  );

  return response;
};

const upDateTableSalesProducts = async (id, productId, quantity) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products 
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?`,
    [productId, quantity, id],
  );
};

module.exports = {
  getAll,
  getBySaleId,
  insertTableSales,
  insertTableSalesProducts,
  upDateTableSales,
  upDateTableSalesProducts,
};