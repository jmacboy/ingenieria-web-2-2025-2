module.exports = app => {
    require('./persona.routes')(app);
    require('./docente.routes')(app);
    require('./auth.routes')(app);
};