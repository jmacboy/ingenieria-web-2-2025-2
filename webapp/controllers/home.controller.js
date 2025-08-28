
const db = require("../models/");

exports.getRoot = (req, res) => {
    res.send('Hello World!')
}
exports.getPrueba = (req, res) => {
    const nombres = ["Juan", "Pedro", "Maria"];
    res.render("prueba", { listaNombres: nombres })
}


exports.getHola = async (req, res) => {
    res.send('¡Hola Mundo!')
    await db.persona.create({
        nombre: "Juan",
        apellido: "Pérez",
        edad: 30,
        ciudad: "Santa Cruz",
        fechaNacimiento: new Date('1993-05-15')
    });
}
exports.getForm = (req, res) => {
    res.sendFile('form.html', { root: __dirname })
}
exports.postFormSubmit = (req, res) => {
    const name = req.query.name;
    const lastName = req.query.lastName;
    res.send(`Nombre: ${name}, Apellido: ${lastName}`);
}
exports.getMateriaSearch = async (req, res) => {
    const query = req.query.q;
    const materiaArr = await db.materia.findAll({
        where: {
            nombre: { [db.Sequelize.Op.like]: `%${query}%` }
        },
        include: 'docente'
    });
    res.render("materias/list", { materiaArr });
};