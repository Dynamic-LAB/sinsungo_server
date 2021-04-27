const db = require('../config/db.config');

module.exports = class ShoppingList {
	constructor(shoppingList) {
		this.name = shoppingList.name;
		this.amount = shoppingList.amount;
		this.unit = shoppingList.unit;
		this.memo = shoppingList.memo;
	};
	
	static create(id, shoppingList, result) {
		db((conn) => {
			conn.execute("INSERT INTO `shoppinglist`(`name`, `amount`, `unit`, `memo`, `refrigerator_id`) VALUES(?, ?, ?, ?, ?)", 
				[shoppingList.name, shoppingList.amount, shoppingList.unit, shoppingList.memo, id], 
				(err, res) => {
				    if (err) {
				      result(err, null);
				      return;
				    }

					result(null, shoppingList);
			});
			conn.release();
		});
	};

	static findAll(id, result) {
		db((conn) => {
			conn.execute("SELECT `id`, `name`, `amount`, `unit`, `memo` FROM `shoppinglist` WHERE `refrigerator_id` = ?", 
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

	static update(id, refrigeratorId, shoppingList, result) {
		db((conn) => {
			conn.execute("UPDATE `shoppinglist` SET `name` = ?, `amount` = ?, `unit` = ?, `memo` = ?, `refrigerator_id` = ? WHERE `id` = ?", 
				[shoppingList.name, shoppingList.amount, shoppingList.unit, shoppingList.memo, refrigeratorId, id], 
				(err, res) => {
				    if (err) {
				      result(err, null);
				      return;
				    }

				    if (res.affectedRows == 0) {
				      result({ message: "not found" }, null);
				      return;
				    }

					result(null, { ...shoppingList });
			});
			conn.release();
		});		
	};

	static delete(id, result) {
		db((conn) => {
			conn.execute("DELETE FROM `shoppinglist` WHERE `id` = ?", [id], (err, res) => {
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