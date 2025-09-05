const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const InscripcionMateria = sequelize.define(
        'InscripcionMateria',
        {
            idInscripcion: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            idMateria: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    );
    return InscripcionMateria;
}