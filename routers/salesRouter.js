const express = require('express');
const controllers = require('../controllers/salesController');
const { saleValidation } = require('../middlewares/salesMiddleware');

const router = express.Router();
router.use(express.json());

router.get('/', controllers.getAll);

router.get('/:id', controllers.getBySaleId);

router.post('/', saleValidation, controllers.createNewSales);

router.put('/:id', saleValidation, controllers.upDateSale);

router.delete('/:id', controllers.deleteSale);

module.exports = router;