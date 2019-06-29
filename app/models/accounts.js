module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        number: {
            type: DataTypes.INTEGER(8),
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
    },
        {
            underscored: true,
        })

    Account.associate = models => {
        Account.hasOne(models.User, { as: 'account' })
        Account.hasMany(models.Transaction, { as: 'from_account', foreignKey: 'from_account_id' })
        Account.hasMany(models.Transaction, { as: 'to_account', foreignKey: 'to_account_id' })
    }

    return Account
}