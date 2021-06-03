const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/notice.controller');

router.get('/', noticeController.findAll);
router.get('/:id', noticeController.findOne); 
module.exports = router;