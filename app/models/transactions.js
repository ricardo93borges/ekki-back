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
            field: 'status_id'
        },
        fromAccountId: {
            type: DataTypes.INTEGER,
            field: 'from_account_id'
        },
        toAccountId: {
            type: DataTypes.INTEGER,
            field: 'to_account_id'
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

    return Transaction
}