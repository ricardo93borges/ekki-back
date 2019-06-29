module.exports = (sequelize, DataTypes) => {
    const Transfer = sequelize.define('Transfer', {
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

    Transfer.associate = models => {
        Transfer.belongsTo(models.Status, { as: 'status' })
        Transfer.belongsTo(models.Account, { as: 'from_account' })
        Transfer.belongsTo(models.Account, { as: 'to_account' })
    }

    return Transfer
}