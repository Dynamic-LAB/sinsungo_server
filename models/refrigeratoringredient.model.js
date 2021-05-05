const db = require('../config/db.config');

module.exports = class RefrigeratorIngredient {
	constructor(refrigeratorIngredient) {
		this.id = refrigeratorIngredient.id;
		this.category = refrigeratorIngredient.category;
		this.name = refrigeratorIngredient.name;
		this.amount = refrigeratorIngredient.amount;
		this.unit = refrigeratorIngredient.unit;
		this.expirationType = refrigeratorIngredient.expirationType;
		this.expirationDate = refrigeratorIngredient.expirationDate;
	};
	
	static create(refingredient, result) {
		db((conn) => {
			conn.execute(
				"INSERT INTO `refrigeratoringredient`(`category`, `name`, `amount`, `unit`, `expiration_type`, `expiration_date`, `refrigerator_id`) VALUES(?, ?, ?, ?, ?, ?, ?)", 
				[refingredient.category, refingredient.name, refingredient.amount, refingredient.unit, refingredient.expirationType, refingredient.expirationDate, refingredient.id],
				(err, res) => {
				    if (err) {
				      result(err, null);
				      return;
				    }

					result(null, refingredient);
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

	static update(refrigeratorId, refingredient, result) {
		db((conn) => {
			conn.execute("UPDATE `refrigeratoringredient` SET `category` = ?, `name` = ?, `amount` = ?, `unit` = ?, `expiration_type` = ?, `expiration_date` = ?, `refrigerator_id` = ? WHERE `id` = ?",
				[refingredient.category, refingredient.name, refingredient.amount, refingredient.unit, refingredient.expirationType, refingredient.expirationDate, refrigeratorId, refingredient.id],
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