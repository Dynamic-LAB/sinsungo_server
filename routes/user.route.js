const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.findOne);
router.post('/auth/login', userController.login);
router.put('/', userController.update);
router.put('/invite', userController.invite);
router.delete('/', userController.delete);

module.exports = router;