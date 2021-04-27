const db = require('../config/db.config');

module.exports = class Recipe {
	constructor(recipe) {
		this.id = recipe.id;
		this.name = recipe.name;
		this.thumbnail = recipe.thumbnail;
		this.url = recipe.url;
		this.description = recipe.description;
		this.inRefIngredients = recipe.inRefIngredients;
		this.notInRefIngredients = recipe.notInRefIngredients;
	}

	static findById(id, start, end, query = '', result) {
		db((conn) => {
			conn.execute("CALL get_recipe(?, ?, ?, ?)", [id, start, end, query], (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				if (res.length >= 1) {
					result(null, res);
					return;
				}

				result({ message: "not found" }, null);
			});
			conn.release();
		});
	}
};