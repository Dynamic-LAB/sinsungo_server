const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');

router.get('/:id', recipeController.getRecipe);

module.exports = router;