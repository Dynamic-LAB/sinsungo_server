const db = require('../config/db.config');

module.exports = class User {
	constructor(user) {
		this.id = user.id;
		this.login_type = user.login_type;
		this.name = user.name;
	}
	
	static create(newUser, result) {
		db((conn) => {
			conn.execute("INSERT INTO `user`(`id`, `login_type`, `name`) VALUES(?, ?, ?)", [newUser.id, newUser.login_type, newUser.name], (err, res) => {
			    if (err) {
			      result(err, null);
			      return;
			    }

				result(null, newUser);
			});
			conn.release();
		});
	};

	static findOne(user, result) {
		db((conn) => {
			conn.execute("SELECT * FROM `user` WHERE `id` = ? and `login_type` = ?", [user.id, user.type], (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				if (res.length >= 1) {
					result(null, res[0]);
					return;
				}

				result({ message: "not found" }, null);
			});
			conn.release();
		});
	};

	static findAll(result) {
		db((conn) => {
			conn.execute("SELECT * FROM `user`", (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				result(null, res);
			});
			conn.release();
		});
	};

	static update(user, result) {
		db((conn) => {
			conn.execute("UPDATE `user` SET `name` = ?, `refrigerator_id` = ?, `push_token` = ?, `push_setting` = ? WHERE `id` = ? and `login_type` = ?",
				[user.name, user.refrigerator_id, user.push_token, user.push_setting, user.id, user.login_type],
				(err, res) => {
					if (err) {
					  result(err, null);
					  return;
					}

					if (res.affectedRows == 0) {
					  result({ message: "not found" }, null);
					  return;
					}

					result(null, user);
			});
			conn.release();
		});		
	};

	static delete(user, result) {
		db((conn) => {
			conn.execute("DELETE FROM `user` WHERE `id` = ? and `login_type` = ?", [user.id, user.type], (err, res) => {
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