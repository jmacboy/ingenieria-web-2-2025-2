const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Docente = sequelize.define(
        'Docente',
        {
            idPersona: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            telefono: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
    );
    return Docente;
}