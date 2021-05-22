const express = require('express');
const router = express.Router();
const refrigeratorController = require('../controllers/refrigerator.controller');
const refrigeratorIngredientController = require('../controllers/refrigeratoringredient.controller');

// 냉장고, 멤버 api
router.get('/:id', refrigeratorController.getMember);
router.post('/', refrigeratorController.create);

// 재료 api
router.get('/ingredient/:id', refrigeratorIngredientController.getIngredient);
router.post('/ingredient', refrigeratorIngredientController.create);
router.put('/ingredient/:id', refrigeratorIngredientController.update);
router.delete('/ingredient/:id', refrigeratorIngredientController.delete);

module.exports = router;