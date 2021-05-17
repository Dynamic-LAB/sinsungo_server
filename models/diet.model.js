const db = require('../config/db.config');

module.exports = class Diet {
	constructor(diet) {
		this.id = diet.id;
		this.memo = diet.memo;
		this.date = diet.date;
		this.menu1 = diet.menu1;
		this.menu2 = diet.menu2;
		this.menu3 = diet.menu3;
		this.menu4 = diet.menu4;
		this.menu5 = diet.menu5;
		this.menu6 = diet.menu6;
		this.menu7 = diet.menu7;
		this.menu8 = diet.menu8;
		this.menu9 = diet.menu9;
		this.menu10 = diet.menu10;
	}
	
	static create(diet, result) {
		db((conn) => {
			conn.execute("INSERT INTO `diet`(`memo`, `date`, `menu1`, `menu2`, `menu3`, `menu4`, `menu5`, `menu6`, `menu7`, `menu8`, `menu9`, `menu10`, `refrigerator_id`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
				[diet.memo, diet.date, diet.menu1, diet.menu2, diet.menu3, diet.menu4, diet.menu5, diet.menu6, diet.menu7, diet.menu8, diet.menu9, diet.menu10, diet.id],
				(err, res) => {
					if (err) {
					  result(err, null);
					  return;
					}

					result(null, {
						id: res.insertId,
						memo: diet.memo,
						date: diet.date,
						menus: [diet.menu1, diet.menu2, diet.menu3, diet.menu4, diet.menu5, diet.menu6, diet.menu7, diet.menu8, diet.menu9, diet.menu10]
					});
			});
			conn.release();
		});
	};

	// 중간 테이블 dietingredient에 삽입하는 함수
	static createPivot(values, result) {
		db( (conn) => {
			conn.query("INSERT INTO `dietingredient`(`diet_id`, `ingredient_id`) VALUES ?", [values], (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				result(null);
			});

			conn.release();
		});
	};

	static findOne(id, result) {
		db((conn) => {
			conn.execute("SELECT * FROM `diet_list` WHERE `id` = ?", [id], (err, res) => {
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
	};

	static findAll(id, result) {
		db((conn) => {
			conn.execute("SELECT * FROM `diet_list` WHERE `refrigerator_id` = ?", [id], (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				result(null, res);
			});
			conn.release();
		});
	};

	static update(refrigeratorId, diet, result) {
		db((conn) => {
			conn.execute("UPDATE `diet` SET `memo` = ?, `date` = ?, `menu1` = ?, `menu2` = ?, `menu3` = ?, `menu4` = ?, `menu5` = ?, `menu6` = ?, `menu7` = ?, `menu8` = ?, `menu9` = ?, `menu10` = ?, `refrigerator_id` = ? WHERE `id` = ?",
				[diet.memo, diet.date, diet.menu1, diet.menu2, diet.menu3, diet.menu4, diet.menu5, diet.menu6, diet.menu7, diet.menu8, diet.menu9, diet.menu10, refrigeratorId, diet.id],
				(err, res) => {
					if (err) {
					  result(err, null);
					  return;
					}

					if (res.affectedRows == 0) {
					  result({ message: "not found" }, null);
					  return;
					}

					result(null, { ...diet });
			});
			conn.release();
		});		
	};

	// 식단의 재료 수정 함수 - dietingredient에서 삽입 또는 삭제
	static updateIngredients(dietId, inserts, deletes, result) {
		db((conn) => {
			let sql1 = "DELETE FROM `dietingredient` WHERE `diet_id` = ? AND `ingredient_id` IN (?); ";
			let sql2 = "INSERT INTO `dietingredient`(`diet_id`, `ingredient_id`) VALUES ?; ";

			conn.query(sql1 + sql2, [dietId, deletes, inserts], (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				if (res.affectedRows == 0) {
					result({ message: "not found" }, null);
					return;
				}

				result(null);
			});
			conn.release();
		});
	};

	static delete(id, result) {
		db((conn) => {
			conn.execute("DELETE FROM `diet` WHERE `id` = ?", [id], (err, res) => {
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