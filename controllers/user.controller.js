const User = require('../models/user.model');

exports.login = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body" 
		});
	}

	User.findOne(req.body.id, req.body.login_type, (err, data) => {
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

exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body"
		});
	}

	User.update(req.body, (err, data) => {
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

exports.delete = (req, res) => {
	User.delete(req.params.id, req.body.login_type,(err, data) => {
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