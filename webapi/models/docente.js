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
            nombreFoto: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fotoPerfil: {
                type: DataTypes.VIRTUAL,
                get: function () {
                    if (!this.nombreFoto) return null;
                    // eslint-disable-next-line no-undef
                    return process.env.BASE_URL + '/uploads/docentes/' + this.nombreFoto
                }
            }
        }
    );
    return Docente;
}