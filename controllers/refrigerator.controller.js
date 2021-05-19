const Refrigerator = require('../models/refrigerator.model');
const groupBy = require('json-groupby');

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body" 
		});
	}

	const refrigerator = new Refrigerator({
		master: req.body.master,
		invite_key: req.body.invite_key
	});

	Refrigerator.create(refrigerator, (err, data) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});
		} else {
			res.status(201).json(data);
		}
	});
};

exports.findOne = (req, res) => {
	Refrigerator.findOne(req.params.id, (err, data) => {
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

exports.getMember = (req, res) => {
	Refrigerator.findAll(req.params.id, (err, data) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});
		} else {
			const refrigerator = new Refrigerator({
				master: data[0].master,
				limit: data[0].limit,
				invite_key: data[0].invite_key
			});

			refrigerator.members = [];

			data.forEach(d => {
				const newMember = {
					id: d.id,
					login_type: d.login_type,
					name: d.name,
					push_token: d.push_token
				};

				refrigerator.members.push(newMember);
			});

			res.status(200).json(refrigerator);
		}
	});
};

exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body" 
		});
	}

	const refrigerator = new Refrigerator({
		master: req.body.master,
		limit: req.body.limit,
		invite_key: req.body.invite_key
	});

	Refrigerator.update(req.params.id, refrigerator, (err, data) => {
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
	Refrigerator.delete(req.params.id, (err, data) => {
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