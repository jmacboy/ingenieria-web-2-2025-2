const db = require("../models/");
const materia = require("../models/materia");

exports.getInscripcionCreate = async (req, res) => {
    const idEstudiante = req.params.id;
    const estudiante = await db.estudiante.findByPk(idEstudiante, {
        include: 'persona'
    });
    const materiaArr = await db.materia.findAll();
    res.render("inscripciones/form", { materiaArr, estudiante });
}

exports.postInscripcionCreate = async (req, res) => {
    const idEstudiante = req.params.id;
    const { idMateria } = req.body;
    const inscripcion = await db.inscripcion.create({
        idEstudiante,
        fechaHora: new Date()
    });
    idMateria.forEach(async materia => {
        await db.inscripcionMateria.create({
            idInscripcion: inscripcion.id,
            idMateria: materia
        });
    });
    res.redirect('/estudiantes');
}