const express = require('express');
const controllers = require('../controllers/salesController');

const router = express.Router();
router.use(express.json());

router.get('/', controllers.getAll);

router.get('/:id', controllers.getBySaleId);

module.exports = router;