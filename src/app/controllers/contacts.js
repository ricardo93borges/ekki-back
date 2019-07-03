const { Op } = require('sequelize');

const { Contact } = require('../models')
const { User } = require('../models')

exports.get = async (req, res) => {
    try {
        const page = req.params.page
        const limit = 10
        const offset = limit * (page - 1)
        const total = await Contact.count({ where: { user_id: req.params.user_id } })
        const contacts = await Contact.findAll({ where: { user_id: req.params.user_id }, include: [{ model: User, as: 'contact' }], offset, limit })

        res.status(200).send({ contacts, total })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}

exports.create = async (req, res) => {
    try {
        const c = await Contact.create(req.body)
        const contact = await Contact.findOne({
            where: { id: c.id },
            include: [{ model: User, as: 'contact' }]
        })

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

exports.getNonContacts = async (req, res) => {
    try {

        const contacts = await Contact.findAll({
            attributes: ['contact_id'],
            where: { user_id: req.params.user_id },
            include: [{ model: User, as: 'contact' }]
        })

        let contactsId = [req.params.user_id].concat(contacts.map(c => c.dataValues.contact_id))

        const users = await User.findAll({
            where: {
                id: { [Op.notIn]: contactsId }
            }
        })

        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors)
    }
}

