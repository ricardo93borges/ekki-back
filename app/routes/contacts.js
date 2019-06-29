const express = require('express');
const router = express.Router();
const controller = require('../controllers/contacts')

router.get('/:user_id(/:page)', controller.get)
router.post('/', controller.create)
router.delete('/:id', controller.delete)

module.exports = router
