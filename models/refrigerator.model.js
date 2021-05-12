const db = require('../config/db.config');

module.exports = class Refrigerator {
	constructor(refrigerator) {
		this.master = refrigerator.master;
		this.limit = refrigerator.limit;
		this.inviteKey = refrigerator.inviteKey;
	};
	
	static create(refrigerator, result) {
		db((conn) => {
			conn.execute("INSERT INTO `refrigerator`(`master`, `invite_key`) VALUES(?, ?)", [refrigerator.master, refrigerator.inviteKey], (err, res) => {
			    if (err) {
			      result(err, null);
			      return;
			    }

				result(null, refrigerator);
			});
			conn.release();
		});
	};

	static findOne(id, result) {
		db((conn) => {
			conn.execute("SELECT * FROM `refrigerator` WHERE `id` = ?", id, (err, res) => {
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

	static findAll(id, result) {
		db((conn) => {
			conn.execute("SELECT `master`, `limit`, `invite_key`, `id`, `login_type`, `name`, `push_token` FROM `refrigerator_member` WHERE `refrigerator_id` = ?", [id], (err, res) => {
				if (err) {
					result(err, null);
					return;
				}

				result(null, res);
			});
			conn.release();
		});
	};

	static update(id, refrigerator, result) {
		db((conn) => {
			conn.execute("UPDATE `refrigerator` SET `master` = ?, `limit` = ?, `invite_key` = ? WHERE `id` = ?", [refrigerator.master, refrigerator.limit, refrigerator.inviteKey, id], (err, res) => {
			    if (err) {
			      result(err, null);
			      return;
			    }

			    if (res.affectedRows == 0) {
			      result({ message: "not found" }, null);
			      return;
			    }

				result(null, { ...refrigerator });
			});
			conn.release();
		});		
	};

	static delete(id, result) {
		db((conn) => {
			conn.execute("DELETE FROM `refrigerator` WHERE `id` = ?", id, (err, res) => {
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