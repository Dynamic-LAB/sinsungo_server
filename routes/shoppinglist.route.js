const express = require('express');
const router = express.Router();
const shoppingListController = require('../controllers/shoppinglist.controller');

router.get('/:id', shoppingListController.findAll);
router.post('/', shoppingListController.create);
router.put('/:id', shoppingListController.update);
router.delete('/:id', shoppingListController.delete);

// 필요한 라우터 추가

module.exports = router;