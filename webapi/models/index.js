const { sequelize } = require("../config/db.config");

const persona = require("./persona")(sequelize);
const materia = require("./materia")(sequelize);
const usuario = require("./usuario")(sequelize);
const estudiante = require("./estudiante")(sequelize);
const docente = require("./docente")(sequelize);
const inscripcion = require("./inscripcion")(sequelize);
const inscripcionMateria = require("./inscripcion_materia")(sequelize);
const authToken = require("./authToken")(sequelize);

//Relaciones de 1 a N
inscripcion.belongsTo(estudiante, { foreignKey: "idEstudiante", as: "estudiante" });
estudiante.hasMany(inscripcion, { foreignKey: "idEstudiante", as: "inscripciones" });

inscripcionMateria.belongsTo(inscripcion, { foreignKey: "idInscripcion", as: "inscripcion" });
inscripcion.hasMany(inscripcionMateria, { foreignKey: "idInscripcion", as: "inscripcionMaterias" });

inscripcionMateria.belongsTo(materia, { foreignKey: "idMateria", as: "materia" });
materia.hasMany(inscripcionMateria, { foreignKey: "idMateria", as: "inscripcionMaterias" });

docente.hasMany(materia, { foreignKey: "idDocente", as: "materias" });
materia.belongsTo(docente, { foreignKey: "idDocente", as: "docente" });

usuario.hasMany(authToken, { foreignKey: "idUsuario", as: "authTokens" });
authToken.belongsTo(usuario, { foreignKey: "idUsuario", as: "usuario" });

//relación 1 a 1
docente.belongsTo(persona, { foreignKey: "idPersona", as: "persona" });
estudiante.belongsTo(persona, { foreignKey: "idPersona", as: "persona" });

module.exports = {
    persona,
    materia,
    usuario,
    estudiante,
    docente,
    inscripcion,
    inscripcionMateria,
    authToken,
    sequelize,
    Sequelize: sequelize.Sequelize
}