const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/auth/login', userController.login);
router.put('/', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;