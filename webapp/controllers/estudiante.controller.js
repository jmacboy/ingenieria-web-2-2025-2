const db = require("../models");

exports.getEstudianteList = async (req, res) => {

    const estudianteArr = await db.estudiante.findAll({
        include: 'persona'
    });
    res.render("estudiantes/list", { estudianteArr });
}

exports.getEstudianteInsert = (req, res) => {
    res.render("estudiantes/form", { estudiante: null });
}
exports.postEstudianteInsert = async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento, telefono, email } = req.body;
    const persona = await db.persona.create({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    console.log(persona);
    await db.estudiante.create({
        idPersona: persona.id,
        telefono,
        email
    });
    res.redirect('/estudiantes');
}

exports.getEstudianteUpdate = async (req, res) => {
    const estudiante = await db.estudiante.findByPk(req.params.id, {
        include: 'persona'
    });
    res.render("estudiantes/form", { estudiante });
}
exports.postEstudianteUpdate = async (req, res) => {
    const id = req.params.id;
    const estudiante = await db.estudiante.findByPk(req.params.id);
    if (!estudiante) {
        res.redirect('/estudiantes');
        return;
    }
    const idPersona = estudiante.idPersona;
    const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
    console.log(req.body);
    await db.persona.update({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    }, {
        where: { id: idPersona }
    });
    await db.estudiante.update({
        telefono: req.body.telefono,
        email: req.body.email
    }, {
        where: { id }
    });
    res.redirect('/estudiantes');
}

exports.postEstudianteDelete = async (req, res) => {
    const id = req.params.id;
    const estudiante = await db.estudiante.findByPk(req.params.id);
    if (!estudiante) {
        res.redirect('/estudiantes');
        return;
    }
    const idPersona = estudiante.idPersona;
    await db.estudiante.destroy({
        where: { id }
    });
    await db.persona.destroy({
        where: { id: idPersona }
    });
    res.redirect('/estudiantes');
}
exports.getEstudianteProfilePicture = async (req, res) => {
    const estudiante = await db.estudiante.findByPk(req.params.id);
    if (!estudiante) {
        res.redirect('/estudiantes');
        return;
    }
    res.render("estudiantes/imagen", { estudiante });
}
exports.postEstudianteProfilePicture = async (req, res) => {
    const id = req.params.id;
    const estudiante = await db.estudiante.findByPk(req.params.id);
    if (!estudiante) {
        res.redirect('/estudiantes');
        return;
    }
    const { fotoPerfil } = req.files;

    if (fotoPerfil) {
        // eslint-disable-next-line no-undef
        const uploadPath = __dirname + '/../public/uploads/estudiantes/' + id + '.jpg';
        await fotoPerfil.mv(uploadPath);
    }
    res.redirect('/estudiantes');
}