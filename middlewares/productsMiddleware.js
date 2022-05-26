const productNameValidation = (name, next) => {
  if (!name) {
    next({
      statusCode: 400,
      message: '"name" is required',
    });
  }

  if (name.length < 5) {
    next({
      statusCode: 422,
      message: '"name" length must be at least 5 characters long',
    });
  }
};

const productQuantityValidation = (quantity, next) => {
  if (!quantity) {
    next({
      statusCode: 400,
      message: '"quantity" is required',
    });
  }

  if (quantity <= 0) {
    next({
      statusCode: 422,
      message: '"quantity" must be greater than or equal to 1',
    });
  }
};

const productValidation = (req, _res, next) => {
  const { name, quantity } = req.body;

  productNameValidation(name, next);

  productQuantityValidation(quantity, next);

  next();
};

module.exports = {
  productValidation,
};