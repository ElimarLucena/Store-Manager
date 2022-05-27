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

const saleValidation = (req, _res, next) => {
  const arr = req.body;

  arr.map(({ productId }) => saleProductIdValidation(productId, next));

  arr.map(({ quantity }) => saleQuantityValidation(quantity, next));

  next();
};

module.exports = {
  saleValidation,
};