const express = require('express')
const router = express.Router()
const cors = require('cors')

const controller = require('../controllers/contacts')

router.all('*', cors());
router.get('/non-contacts/:user_id', controller.getNonContacts)
router.get('/:user_id/:page', controller.get)
router.post('/', controller.create)
router.delete('/:id', controller.delete)

module.exports = router
