const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactions')

router.get('/:account_id/:page', controller.get)
router.post('/', controller.create)

module.exports = router
