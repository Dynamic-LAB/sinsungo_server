const RefrigeratorIngredient = require('../models/refrigeratoringredient.model');

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).json({
			message: "empty body" 
		});
	}

	const ingredients = [];

	req.body.map(ingredient => ingredients.push([
		ingredient.category,
		ingredient.name,
		ingredient.amount,
		ingredient.unit,
		ingredient.expiration_type,
		ingredient.expiration_date,
		ingredient.id
	]));

	RefrigeratorIngredient.create(ingredients, (err, data) => {
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
	RefrigeratorIngredient.findOne(req.params.id, (err, data) => {
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

exports.getIngredient = (req, res) => {
	RefrigeratorIngredient.findAllById(req.params.id, (err, data) => {
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

	const refrigeratorIngredient = new RefrigeratorIngredient({
		id: req.body.id,
		category: req.body.category,
		name: req.body.name,
		amount: req.body.amount,
		unit:req.body.unit,
		expiration_type: req.body.expiration_type,
		expiration_date: req.body.expiration_date,
	});
	
	RefrigeratorIngredient.update(req.params.id, refrigeratorIngredient, (err, data) => {
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
	RefrigeratorIngredient.delete(req.params.id, (err, data) => {
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