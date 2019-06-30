const { Contact } = require('../models')

exports.get = async (req, res) => {
    try {
        const page = req.params.page
        const limit = 10
        const offset = limit * (page - 1)
        const total = await Contact.count({ where: { user_id: req.params.user_id } })
        const contacts = await Contact.findAll({ where: { user_id: req.params.user_id }, offset, limit })

        res.status(200).send({ contacts, total })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}

exports.create = async (req, res) => {
    try {
        const contact = await Contact.create(req.body)
        res.status(201).send(contact)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}

exports.delete = async (req, res) => {
    try {
        await Contact.destroy({ where: { id: req.params.id } })
        res.status(200).send({ message: 'Contact deleted' })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}

