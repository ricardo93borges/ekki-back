module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        number: {
            type: DataTypes.STRING(8),
            allowNull: false,
            unique: true,
        },
        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        limit: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    })

    Account.associate = models => {
        Account.hasOne(models.User, { as: 'account' })
        Account.hasMany(models.Transaction, { as: 'from_account', foreignKey: 'from_account_id' })
        Account.hasMany(models.Transaction, { as: 'to_account', foreignKey: 'to_account_id' })
    }

    Account.prototype.checkFunds = function (amount = 0) {
        let funds = { balance: this.balance, limit: this.limit, balanceUsage: 0, limitUsage: 0 }

        if (this.balance <= amount) {
            funds.balanceUsage = this.balance
            funds.limitUsage = amount - this.balance
        } else {
            funds.balanceUsage = amount
            funds.limitUsage = 0
        }

        return funds
    }

    return Account
}