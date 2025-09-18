module.exports = app => {
    require('./persona.routes')(app);
    require('./docente.routes')(app);
};