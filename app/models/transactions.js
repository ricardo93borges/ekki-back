const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        statusId: {
            type: DataTypes.INTEGER,
            field: 'status_id',
            allowNull: false
        },
        fromAccountId: {
            type: DataTypes.INTEGER,
            field: 'from_account_id',
            allowNull: false
        },
        toAccountId: {
            type: DataTypes.INTEGER,
            field: 'to_account_id',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    },
        {
            underscored: true,
        })

    Transaction.associate = models => {
        Transaction.belongsTo(models.Status, { as: 'status' })
        Transaction.belongsTo(models.Account, { as: 'from_account' })
        Transaction.belongsTo(models.Account, { as: 'to_account' })
    }

    /**
     * Find a similar transaction two minutes ago
     */
    Transaction.findSimilarTransaction = async (fromAccountId, toAccountId, amount) => {
        try {
            const similarTransaction = await Transaction.findOne({
                where: {
                    amount,
                    fromAccountId,
                    toAccountId,
                    created_at: {
                        [Op.between]: [(Date.now() - (2 * 60000)), Date.now()]
                    }
                }
            })

            return similarTransaction
        } catch (err) {
            console.log(err)
            return err
        }
    }

    /**
     * Add transaction and update accounts funds
     */
    Transaction.add = async (fromAccount, toAccount, status, amount, limit = null) => {
        try {
            if (limit) {
                await fromAccount.update({ balance: 0, limit })
            } else {
                await fromAccount.update({ balance: (Number(fromAccount.balance) - amount) })
            }

            await toAccount.update({ balance: (Number(toAccount.balance) + amount) })

            const transaction = await Transaction.create({
                fromAccountId: fromAccount.id,
                toAccountId: toAccount.id,
                amount,
                statusId: status.id
            })
            return transaction

        } catch (err) {
            console.log(err)
            return err
        }
    }

    /**
     * Add similar transaction
     */
    Transaction.addSimilar = async (fromAccount, toAccount, amount, successStatus, canceledStatus, similarTransaction) => {
        try {
            similarTransaction.update({ statusId: canceledStatus.id })

            const transaction = await Transaction.create({
                fromAccountId: fromAccount.id,
                toAccountId: toAccount.id,
                amount,
                statusId: successStatus.id
            })
            return transaction

        } catch (err) {
            console.log(err)
            return err
        }
    }

    return Transaction
}