const getAllProducts = require('../services/productsService'); // função vinda da camada de service das vendas.

const saleProductIdValidation = (productId, next) => {
  if (!productId) {
    next({
      statusCode: 400,
      message: '"productId" is required',
    });
  }
};

const saleQuantityValidation = (quantity, next) => {
  if (!quantity) {
    next({
      statusCode: 400,
      message: '"quantity" is required',
    });
  }

  if (quantity.length <= 0) {
    next({
      statusCode: 422,
      message: '"quantity" must be greater than or equal to 1',
    });
  }
};

const saleQuantityValidationLimit = async (productId, quantity, next) => {
  const allProducts = await getAllProducts.getAll();

  const product = allProducts.find((item) => item.id === productId);

  if (product.quantity < quantity) {
    next({
      statusCode: 422,
      message: 'Such amount is not permitted to sell',
    });
  }
};

const saleValidation = async (req, _res, next) => {
  const arr = req.body;

  arr.map(({ productId }) => saleProductIdValidation(productId, next));

  arr.map(({ quantity }) => saleQuantityValidation(quantity, next));

  arr.map(({ productId, quantity }) => saleQuantityValidationLimit(productId, quantity, next));

  next();
};

module.exports = {
  saleValidation,
};