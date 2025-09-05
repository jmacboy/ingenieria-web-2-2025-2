module.exports = app => {
    require('./home.routes')(app);
    require('./estudiante.routes')(app);
    require('./docente.routes')(app);
    require('./materia.routes')(app);
    require('./inscripcion.routes')(app);
}