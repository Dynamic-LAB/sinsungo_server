const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');

router.get('/:id', notificationController.findAll);
router.delete('/:id', notificationController.delete);
module.exports = router;