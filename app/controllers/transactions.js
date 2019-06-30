const { Op } = require('sequelize');
const { Transaction } = require('../models')

exports.get = async (req, res) => {
    try {

        const page = req.params.page
        const limit = 10
        const offset = limit * (page - 1)

        const total = await Transaction.count({
            where: { [Op.or]: [{ from_account_id: req.params.account_id }, { to_account_id: req.params.account_id }] }
        })

        const transactions = await Transaction.findAll({
            where: { [Op.or]: [{ from_account_id: req.params.account_id }, { to_account_id: req.params.account_id }] },
            offset, limit
        })

        res.status(200).send({ transactions, total })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}

exports.create = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body)
        res.status(201).send(transaction)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}
