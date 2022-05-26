const express = require('express');
const controllers = require('../controllers/productsController');
// const { productValidation } = require('../middlewares/productsMiddleware');
// const { saleValidation } = require('../middlewares/salesMiddleware');

const router = express.Router();
router.use(express.json());

router.get('/', controllers.getAll);

router.get('/:id', controllers.getByProductId);

// router.post('/', productValidation, saleValidation, );

module.exports = router;