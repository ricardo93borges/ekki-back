const { Op } = require('sequelize');
const { Transaction } = require('../models')
const { Account } = require('../models')
const { Status } = require('../models')
const { User } = require('../models')

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
            include: [
                { model: Status, as: 'status' },
                { model: Account, as: 'to_account', include: [{ model: User, as: 'account' }] },
            ],
            order: [['createdAt', 'DESC']],
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
        const fromAccount = await Account.findByPk(req.body.fromAccountId)
        const toAccount = await Account.findByPk(req.body.toAccountId)
        const successStatus = await Status.findOne({ where: { name: 'Concluida' } })
        const amount = req.body.amount

        //If there is a similar transaction two minutes ago
        const similarTransaction = await Transaction.findSimilarTransaction(fromAccount.id, toAccount.id, amount)
        if (similarTransaction) {
            const canceledStatus = await Status.findOne({ where: { name: 'Cancelada' } })
            const transaction = await Transaction.addSimilar(fromAccount, toAccount, amount, successStatus, canceledStatus, similarTransaction)
            return res.status(201).send(transaction)
        }

        //If account has sufficient balance
        if (Number(fromAccount.balance) >= amount) {
            const transaction = await Transaction.add(fromAccount, toAccount, successStatus, amount)
            return res.status(201).send(transaction)
        }

        //If account has sufficient funds (balance + limit)
        const funds = (Number(fromAccount.limit) + Number(fromAccount.balance))
        if (funds > amount) {
            const limit = fromAccount.limit - (amount - fromAccount.balance)
            const transaction = await Transaction.add(fromAccount, toAccount, successStatus, amount, limit)
            return res.status(201).send(transaction)
        } else {
            return res.status(500).send({ errors: [{ message: 'insufficient funds' }] })
        }

    } catch (err) {
        console.log(err)
        res.status(500).send(err.errors);
    }
}
