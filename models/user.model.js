const db = require('../config/db.config');

module.exports = class User {
	constructor(user) {
		this.id = user.id;
		this.loginType = user.loginType;
		this.name = user.name;
	}
	
	static create(newUser, result) {
		db((conn) => {
			conn.execute("INSERT INTO `user`(`id`, `login_type`, `name`) VALUES(?, ?, ?)", [newUser.id, newUser.loginType, newUser.name], (err, res) => {
			    if (err) {
			      result(err, null);
			      return;
			    }

				result(null, newUser);
			});
			conn.release();
		});
	};

	static findOne(id, type, result) {
		db((conn) => {
			conn.execute("SELECT * FROM `user` WHERE `id` = ? and `login_type` = ?", [id, type], (err, res) => {
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
			conn.execute("UPDATE `user` SET `name` = ? WHERE `id` = ? and `login_type` = ?", [user.name, user.id, user.loginType], (err, res) => {
			    if (err) {
			      result(err, null);
			      return;
			    }

			    if (res.affectedRows == 0) {
			      result({ message: "not found" }, null);
			      return;
			    }

				result(null, { ...user });
			});
			conn.release();
		});		
	};

	static delete(id, type, result) {
		db((conn) => {
			conn.execute("DELETE FROM `user` WHERE `id` = ? and `login_type` = ?", [id, type], (err, res) => {
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