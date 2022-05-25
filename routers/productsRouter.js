const express = require('express');
const controllers = require('../controllers/productsController');

const router = express.Router();
router.use(express.json());

router.get('/', controllers.getAll);

router.get('/:id', controllers.getByProductId);

module.exports = router;