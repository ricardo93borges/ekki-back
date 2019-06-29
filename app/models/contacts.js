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
            field: 'user_id'
        },
        contactId: {
            type: DataTypes.INTEGER,
            unique: 'contacts_unique',
            field: 'contact_id'
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


    return Contact
}