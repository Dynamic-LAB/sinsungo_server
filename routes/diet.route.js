const express = require('express');
const router = express.Router();
const dietController = require('../controllers/diet.controller');

router.get('/:id', dietController.findOne);
router.get('/refrigerator/:id', dietController.findAll);
router.post('/', dietController.create);
router.put('/:id', dietController.update);
router.delete('/:id', dietController.delete);

module.exports = router;