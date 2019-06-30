const express = require('express');
const router = express.Router();
const controller = require('../controllers/accounts')

router.get('/check-funds/:id/:amount', controller.checkFunds)

module.exports = router
