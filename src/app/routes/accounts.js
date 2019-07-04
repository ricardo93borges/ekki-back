const express = require('express');
const router = express.Router();
const cors = require('cors')

const controller = require('../controllers/accounts')

router.all('*', cors());
router.get('/check-funds/:id/:amount', controller.checkFunds)

module.exports = router
