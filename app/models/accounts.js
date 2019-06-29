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
        Account.hasOne(models.Account, { as: 'account_id' })
    }

    return Account
}