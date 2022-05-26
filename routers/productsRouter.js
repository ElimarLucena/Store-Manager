const express = require('express');
const controllers = require('../controllers/productsController');
const { productValidation } = require('../middlewares/productsMiddleware');

const router = express.Router();
router.use(express.json());

router.get('/', controllers.getAll);

router.get('/:id', controllers.getByProductId);

router.post('/', productValidation, controllers.createNewProduct);

module.exports = router;