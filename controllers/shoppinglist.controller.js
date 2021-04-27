const ShoppingList = require('../models/shoppinglist.model');

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body" 
		});
	}

	const shoppingList = new ShoppingList({
		name: req.body.name,
		amount: req.body.amount,
		unit: req.body.unit,
		memo: req.body.memo
	});

	ShoppingList.create(req.body.id, shoppingList, (err, data) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});
		} else {
			res.status(201).json(data);
		}
	});
};

exports.findAll = (req, res) => {
	ShoppingList.findAll(req.params.id, (err, data) => {
		if (err) {
			res.status(500).json({
				message: err.message
			});
		} else {
			res.status(200).json(data);
		}
	});
};

exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body" 
		});
	}

	const shoppingList = new ShoppingList({
		name: req.body.name,
		amount: req.body.amount,
		unit: req.body.unit,
		memo: req.body.memo
	});

	ShoppingList.update(req.body.id, req.params.id, shoppingList, (err, data) => {
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
	ShoppingList.delete(req.params.id, (err, data) => {
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