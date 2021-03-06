const User = require('../models/user.model');
const Refrigerator = require('../models/refrigerator.model');

exports.login = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body" 
		});
	}

	User.findOne(req.body, (err, data) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});
		} else if (data) {
			res.status(200).json(data);
		} else {

			User.create(req.body, (err, data) => {
				if (err) {
					res.status(500).json({
						message: err.message
					});
				} else {
					res.status(201).json(data);
				}
			});
		}
	});
};

exports.findOne = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body"
		});
	}

	User.findOne(req.body, (err, data) => {
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

exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body"
		});
	}

	const user = {
		id: req.body.id,
		login_type: req.body.login_type,
		name: req.body.name,
		push_token: (req.body.push_token === "") ? null : req.body.push_token,
		refrigerator_id: (req.body.refrigerator_id === 0) ? null : req.body.refrigerator_id,
		push_setting: req.body.push_setting
	};

	User.update(user, (err, data) => {
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

exports.invite = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body"
		});
	}

	Refrigerator.findOne(req.body.inviteKey, (err, data) => {

		if (err) {
			if (err.message == "not found") {
				res.status(404).json({
					message: "refrigerator not found"
				});
			} else {
				res.status(500).json({
					message: err.message
				});
			}
		} else { // 해당 초대 코드의 냉장고 있을 때
			if (data.limit === 0) { // 냉장고에 자리가 없을 때
				res.status(412).json({
					message: "max people"
				})
			} else { // 냉장고에 자리가 있을 때
				req.body.user.refrigerator_id = data.id;

				User.update(req.body.user, (err, data) => {
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
			}
		}
	});
};

exports.delete = (req, res) => {
	User.delete(req.body, (err, data) => {
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
		} else res.status(200).json({ message: "delete success"});
	});
};