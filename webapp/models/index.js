const { sequelize } = require("../config/db.config");

const persona = require("./persona")(sequelize);
const materia = require("./materia")(sequelize);

persona.hasMany(materia, { foreignKey: "idDocente", as: "materias" });
materia.belongsTo(persona, { foreignKey: "idDocente", as: "docente" });

module.exports = {
    persona,
    materia,
    sequelize,
    Sequelize: sequelize.Sequelize
}