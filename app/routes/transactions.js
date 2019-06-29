const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactions')

router.get('/:account_id(/:page)', controller.get)
router.post('/', controller.create)
router.put('/', controller.update)

module.exports = router
