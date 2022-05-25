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

module.exports = {
  getAll,
};