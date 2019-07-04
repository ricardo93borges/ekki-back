const express = require('express');
const router = express.Router();
const cors = require('cors')

const controller = require('../controllers/users')

router.all('*', cors());
router.get('/', controller.all)
router.get('/:id', controller.get)
router.post('/', controller.create)

module.exports = router
