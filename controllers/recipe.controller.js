const Recipe = require('../models/recipe.model');
const groupBy = require('json-groupby');

exports.getRecipe = (req, res) => {
	let id = req.params.id;
	let start = req.query.start;
	let end = req.query.end;
	let query = req.query.query;

	Recipe.findById(id, start, end, query, (err, data) => {
		if (err) {
			if (err.message == "not found") {
				res.status(404).json({
					message: err.message
				});
			} else {
				res.status(500).json({
					message: err.message
				});
			}
		} else {
			const recipes = []
			const recipeData = Object.entries(groupBy(data[0], ['id']));

			recipeData.forEach(x => {
				const recipe = new Recipe({
					id: x[1][0].id,
					name: x[1][0].name,
					thumbnail: x[1][0].thumbnail,
					url: x[1][0].url,
					description: x[1][0].description,
					inRefIngredients: [],
					notInRefIngredients: []
				});

				x[1].forEach(d => {
					if (d.ingredient_id != null) recipe.inRefIngredients.push(d.ingredient_name);
					else recipe.notInRefIngredients.push(d.ingredient_name);
				});

				recipes.push(recipe);
			});

			res.status(200).json(recipes);
		}
	});
};

exports.getIngredients = (req, res) => {
	Recipe.findAll((err, data) => {
		if (err) {
			if (err.message == "not found") {
				res.status(404).json({
					message: err.message
				});
			} else {
				res.status(500).json({
					message: err.message
				});
			}
		} else res.status(200).json(data);
	});
};