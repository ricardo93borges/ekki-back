const express = require('express');
const router = express.Router();
const cors = require('cors')

const controller = require('../controllers/transactions')

router.all('*', cors());
router.get('/:account_id/:page', controller.get)
router.post('/', controller.create)

module.exports = router
