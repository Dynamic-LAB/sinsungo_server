const db = require('../config/db.config');

module.exports = class Refrigerator {
	constructor(refrigerator) {
		this.master = refrigerator.master;
		this.invite_key = refrigerator.invite_key;
	};
	
	static create(refrigerator, result) {
		db((conn) => {
			conn.execute("INSERT INTO `refrigerator`(`master`, `invite_key`) VALUES(?, ?)", [refrigerator.master, refrigerator.invite_key], (err, res) => {
			    if (err) {
			      result(err, null);
			      return;
			    }

				result(null, { id: res.insertId });
			});
			conn.release();
		});
	};

	static findOne(inviteKey, result) {
		db((conn) => {
			conn.execute("SELECT `id`, `limit` FROM `refrigerator` WHERE `invite_key` = ?", [inviteKey], (err, res) => {
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

	static findAll(id, result) {
		db((conn) => {
			conn.execute("SELECT `master`, `limit`, `invite_key`, `id`, `login_type`, `name`, `push_token`, `push_setting` FROM `refrigerator_member` WHERE `refrigerator_id` = ?", [id], (err, res) => {
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
			conn.execute("UPDATE `refrigerator` SET `master` = ?, `limit` = ?, `invite_key` = ? WHERE `id` = ?", [refrigerator.master, refrigerator.limit, refrigerator.invite_key, id], (err, res) => {
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