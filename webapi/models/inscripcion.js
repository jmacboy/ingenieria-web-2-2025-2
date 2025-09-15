const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
    const Inscripcion = sequelize.define(
        'Inscripcion',
        {
            idEstudiante: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fechaHora: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        }, {
        tableName: 'inscripciones'
    }
    );
    return Inscripcion;
}