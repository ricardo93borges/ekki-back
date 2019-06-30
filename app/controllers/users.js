const { User } = require('../models')
const { Account } = require('../models')

exports.all = async (req, res) => {
    try {
        const users = await User.findAll()
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors)
    }
}

exports.get = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        const account = await Account.findByPk(user.accountId)
        res.status(200).json({ ...user.dataValues, account: account.dataValues })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors)
    }
}

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).send(user)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors)
    }
}