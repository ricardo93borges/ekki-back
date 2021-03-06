module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define('Status', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
        }
    },
        {
            timestamps: false,
        })


    return Status
}