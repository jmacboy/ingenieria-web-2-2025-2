module.exports = (app, db) => {

    app.get('/materias', async (req, res) => {
        const materiaArr = await db.materia.findAll({
            include: 'docente'
        });
        res.render("materias/list", { materiaArr });
    })

    app.post('/materias/:id/delete', async (req, res) => {
        const id = req.params.id;
        await db.materia.destroy({
            where: { id }
        });
        res.redirect('/materias');
    })

    //El get siemper muestra el formulario
    app.get('/materias/create', async (req, res) => {
        const docenteArr = await db.persona.findAll();
        res.render("materias/form", { materia: null, docenteArr });
    })
    //El post es para guardar los datos
    app.post('/materias/create', async (req, res) => {
        const { nombre, descripcion, creditos, idDocente } = req.body;
        await db.materia.create({
            nombre,
            descripcion,
            creditos,
            idDocente
        });
        res.redirect('/materias');
    })

    app.get('/materias/:id', async (req, res) => {
        const materia = await db.materia.findByPk(req.params.id);
        const docenteArr = await db.persona.findAll();
        res.render("materias/form", { materia, docenteArr });
    })
    app.post('/materias/:id', async (req, res) => {
        const id = req.params.id;
        const { nombre, descripcion, creditos, idDocente } = req.body;
        await db.materia.update({
            nombre,
            descripcion,
            creditos,
            idDocente,
        }, {
            where: { id }
        });
        res.redirect('/materias');
    });
    app.get('/search', async (req, res) => {
        const query = req.query.q;
        const materiaArr = await db.materia.findAll({
            where: {
                nombre: { [db.Sequelize.Op.like]: `%${query}%` }
            },
            include: 'docente'
        });
        res.render("materias/list", { materiaArr });
    });
}