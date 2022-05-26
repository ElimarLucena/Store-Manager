const express = require('express');
const controllers = require('../controllers/salesController');
const { saleValidation } = require('../middlewares/salesMiddleware');

const router = express.Router();
router.use(express.json());

router.get('/', controllers.getAll);

router.get('/:id', controllers.getBySaleId);

router.post('/', saleValidation, (_req, res) => {
  res.status(200).send('ok');
});

module.exports = router;