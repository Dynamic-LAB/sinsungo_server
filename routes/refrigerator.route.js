const express = require('express');
const router = express.Router();
const refrigeratorController = require('../controllers/refrigerator.controller');
const refrigeratorIngredientController = require('../controllers/refrigeratoringredient.controller');

router.get('/ingredient/:id', refrigeratorController.getIngredient);
router.post('/ingredient', refrigeratorIngredientController.create);
router.put('/ingredient/:id', refrigeratorIngredientController.update);
router.delete('/ingredient/:id', refrigeratorIngredientController.delete);

// 필요한 라우터 추가

module.exports = router;