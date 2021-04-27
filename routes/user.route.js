const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/auth/login', userController.login);

// 필요한 라우터 추가

module.exports = router;