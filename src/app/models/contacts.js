module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        userId: {
            type: DataTypes.INTEGER,
            unique: 'contacts_unique',
            allowNull: false
        },
        contactId: {
            type: DataTypes.INTEGER,
            unique: 'contacts_unique',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
    })

    Contact.associate = models => {
        Contact.belongsTo(models.User, { as: 'user'})
        Contact.belongsTo(models.User, { as: 'contact'})
    }


    return Contact
}