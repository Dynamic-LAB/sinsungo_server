const express = require('express');
const router = express.Router();
const refrigeratorController = require('../controllers/refrigerator.controller');
const recipeController = require('../controllers/recipe.controller');

router.get('/recipe/:id', recipeController.getRecipe);

module.exports = router;