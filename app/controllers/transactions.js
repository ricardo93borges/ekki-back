const { Op } = require('sequelize');
const { Transaction } = require('../models')
const { Account } = require('../models')
const { Status } = require('../models')

exports.get = async (req, res) => {
    try {
        const page = req.params.page
        const limit = 10
        const offset = limit * (page - 1)
        const accountId = req.params.account_id

        const total = await Transaction.count({
            where: { [Op.or]: [{ from_account_id: accountId }, { to_account_id: accountId }] }
        })

        const transactions = await Transaction.findAll({
            where: { [Op.or]: [{ from_account_id: accountId }, { to_account_id: accountId }] },
            offset, limit
        })

        res.status(200).send({ transactions, total })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}
/**
 * TODO se existe uma transaction com o mesmo valor feita a menos de 2 minutos atras:
 *  cancelar transaction antiga
 *  criar uma nova no lugar
 */
exports.create = async (req, res) => {
    try {
        const fromAccount = await Account.findByPk(req.body.fromAccountId)
        const toAccount = await Account.findByPk(req.body.toAccountId)
        const status = await Status.findOne({ where: { name: 'success' } })
        const amount = req.body.amount

        //If account has sufficient balance
        if (Number(fromAccount.balance) >= amount) {
            const transaction = await Transaction.add(fromAccount, toAccount, status, amount)
            res.status(201).send(transaction)
        }

        const cash = (Number(fromAccount.limit) + Number(fromAccount.balance))

        //If account has sufficient funds
        if (cash > amount) {
            const limit = fromAccount.limit - (amount - fromAccount.balance)
            const transaction = await Transaction.add(fromAccount, toAccount, status, amount, limit)
            res.status(201).send(transaction)
        } else {
            res.status(500).send({ errors: [{ message: 'insufficient funds' }] })
        }

        const transaction = await Transaction.add(req.body.amount, req.body.fromAccountId, req.body.toAccountId)
        res.status(201).send(transaction)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}
