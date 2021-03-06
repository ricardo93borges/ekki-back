module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING(13),
            allowNull: false,
            unique: true
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    })

    User.associate = models => {
        User.belongsToMany(models.User, { as: 'user', through: 'contacts' })
        User.belongsToMany(models.User, { as: 'contact', through: 'contacts' })
        User.belongsTo(models.Account, { as: 'account' })
    }

    return User
}