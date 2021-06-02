const db = require('../config/db.config');

module.exports = class RefrigeratorIngredient {
	constructor(refrigeratorIngredient) {
		this.id = refrigeratorIngredient.id;
		this.category = refrigeratorIngredient.category;
		this.name = refrigeratorIngredient.name;
		this.amount = refrigeratorIngredient.amount;
		this.unit = refrigeratorIngredient.unit;
		this.expiration_type = refrigeratorIngredient.expiration_type;
		this.expiration_date = refrigeratorIngredient.expiration_date;
	};
	
	static create(ingredients, result) {
		db((conn) => {
			conn.query(
				"INSERT INTO `refrigeratoringredient`(`category`, `name`, `amount`, `unit`, `expiration_type`, `expiration_date`, `refrigerator_id`) VALUES ?",
				[ingredients], (err, res) => {

				if (err) {
				  result(err, null);
				  return;
				}

				ingredients = ingredients.map(ingredient => new RefrigeratorIngredient(
					{
						id: res.insertId,
						category: ingredient[0],
						name: ingredient[1],
						amount: ingredient[2],
						unit: ingredient[3],
						expiration_type: ingredient[4],
						expiration_date: ingredient[5]
					}
				));
				result(null, ingredients);
			});
			conn.release();
		});
	};

	static findOne(id, result) {
		db((conn) => {
			conn.execute("SELECT * FROM `refrigeratoringredient` WHERE `id` = ?", [id], (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				if (res.length >= 1) {
					result(null, res[0]);
					return;
				}

				result(null, null);
			});
			conn.release();
		});
	};

	static findAllById(id, result) {
		db((conn) => {

			conn.execute("SELECT `id`, `category`, `name`, `amount`, `unit`, `expiration_type`, `expiration_date`,now() as today FROM `refrigerator_ingredient` WHERE `refrigerator_id` = ?",
				[id], (err, res) => {
					if (err) {
						result(err, null);
						return;
					}

					result(null, res);
				});
			conn.release();
		});
	};

	static findAll(result) {
		db((conn) => {

			conn.execute("SELECT `refrigerator_id`, `id`, `name`, `expiration_type`, `expiration_date`,now() as today FROM `refrigerator_ingredient`",
				(err, res) => {
					if (err) {
						result(err, null);
						return;
					}

					result(null, res);
				});
			conn.release();
		});
	}

	static update(refrigeratorId, refingredient, result) {
		db((conn) => {
			conn.execute("UPDATE `refrigeratoringredient` SET `category` = ?, `name` = ?, `amount` = ?, `unit` = ?, `expiration_type` = ?, `expiration_date` = ?, `refrigerator_id` = ? WHERE `id` = ?",
				[refingredient.category, refingredient.name, refingredient.amount, refingredient.unit, refingredient.expiration_type, refingredient.expiration_date, refrigeratorId, refingredient.id],
					(err, res) => {
				    if (err) {
				      result(err, null);
				      return;
				    }

				    if (res.affectedRows == 0) {
				      result({ message: "not found" }, null);
				      return;
				    }

					result(null, { ...refingredient });
			});
			conn.release();
		});		
	};

	static delete(id, result) {
		db((conn) => {
			conn.execute("DELETE FROM `refrigeratoringredient` WHERE `id` = ?", [id], (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				if (res.affectedRows == 0) {
			      result({ message: "not found" }, null);
			      return;
			    }

	    		result(null, res);
			});
			conn.release();
		});
		
	};
};