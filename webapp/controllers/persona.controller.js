module.exports = (app, db) => {
    app.get('/personas', async (req, res) => {
        const personaArr = await db.persona.findAll();
        res.render("personas/list", { personaArr });
    })

    app.post('/personas/:id/delete', async (req, res) => {
        const id = req.params.id;
        await db.persona.destroy({
            where: { id }
        });
        res.redirect('/personas');
    })

    app.get('/personas/create', (req, res) => {

        res.render("personas/form", { persona: null });
    })
    app.post('/personas/create', async (req, res) => {
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        await db.persona.create({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        });
        res.redirect('/personas');
    })

    app.get('/personas/:id', async (req, res) => {
        const persona = await db.persona.findByPk(req.params.id);
        res.render("personas/form", { persona });
    })
    app.post('/personas/:id', async (req, res) => {
        const id = req.params.id;
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        await db.persona.update({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        }, {
            where: { id }
        });
        res.redirect('/personas');
    });

}