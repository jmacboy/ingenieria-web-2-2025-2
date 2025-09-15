const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Persona = sequelize.define(
        'Persona',
        {
            nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            apellido: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            edad: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ciudad: {
                type: DataTypes.STRING,
            },
            fechaNacimiento: {
                type: DataTypes.DATE,
            }
        },
    );
    return Persona;
}