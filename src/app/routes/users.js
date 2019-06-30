const express = require('express');
const router = express.Router();
const controller = require('../controllers/users')

router.get('/', controller.all)
router.get('/:id', controller.get)
router.post('/', controller.create)

module.exports = router
