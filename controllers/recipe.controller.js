const Recipe = require('../models/recipe.model');

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
			const recipeData = data[0].reduce(reducer, []).map(key => data[0].filter(d => d.id === key));

			recipeData.forEach(x => {
				const recipe = new Recipe({
					id: x[0].id,
					name: x[0].name,
					thumbnail: x[0].thumbnail,
					url: x[0].url,
					description: x[0].description,
					inRefIngredients: [],
					notInRefIngredients: []
				});

				x.forEach(d => {
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

const reducer = (acc, val) => {
	const key = val.id;

	if (!acc.includes(key)) {
		acc.push(key);
	}

	return acc
};