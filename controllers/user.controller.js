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
			console.log("'"+req.body.name+"'"+'님 '+req.body.login_type+'계정으로 로그인');
		} else {
			console.log('회원가입 실행.');
			const user = new User({
				id: req.body.id,
				loginType: req.body.login_type,
				name: req.body.name
			});
			User.create(user, (err, data) => {
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


// 다른 함수 추가