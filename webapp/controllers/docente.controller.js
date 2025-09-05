const db = require("../models");

exports.getDocenteList = async (req, res) => {

    const docenteArr = await db.docente.findAll({
        include: 'persona'
    });
    res.render("docentes/list", { docenteArr });
}

exports.getDocenteInsert = (req, res) => {
    res.render("docentes/form", { docente: null });
}
exports.postDocenteInsert = async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento, telefono, email } = req.body;
    const persona = await db.persona.create({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    });
    await db.docente.create({
        telefono,
        email,
        idPersona: persona.id
    });
    res.redirect('/docentes');
}

exports.getDocenteUpdate = async (req, res) => {
    const docente = await db.docente.findByPk(req.params.id, {
        include: 'persona'
    });
    console.log(docente);
    res.render("docentes/form", { docente });
}
exports.postDocenteUpdate = async (req, res) => {
    const id = req.params.id;
    const docente = await db.docente.findByPk(req.params.id);
    if (!docente) {
        res.redirect('/docentes');
        return;
    }
    const idPersona = docente.idPersona;
    const { nombre, apellido, edad, ciudad, fechaNacimiento, telefono, email } = req.body;
    await db.persona.update({
        nombre,
        apellido,
        edad,
        ciudad,
        fechaNacimiento
    }, {
        where: { id: idPersona }
    });
    await db.docente.update({
        telefono,
        email
    }, {
        where: { id }
    });
    res.redirect('/docentes');
}

exports.postDocenteDelete = async (req, res) => {
    const id = req.params.id;
    const docente = await db.docente.findByPk(req.params.id);
    if (!docente) {
        res.redirect('/docentes');
        return;
    }
    const idPersona = docente.idPersona;
    await db.docente.destroy({
        where: { id }
    });
    await db.persona.destroy({
        where: { id: idPersona }
    });
    res.redirect('/docentes');
}
exports.getDocenteProfilePicture = async (req, res) => {
    const docente = await db.docente.findByPk(req.params.id, {
        include: 'persona'
    });
    if (!docente) {
        res.redirect('/docentes');
        return;
    }
    res.render("docentes/imagen", { docente });
}
exports.postDocenteProfilePicture = async (req, res) => {
    const id = req.params.id;
    const docente = await db.docente.findByPk(req.params.id);
    if (!docente) {
        res.redirect('/docentes');
        return;
    }
    const { fotoPerfil } = req.files;

    if (fotoPerfil) {
        // eslint-disable-next-line no-undef
        const uploadPath = __dirname + '/../public/uploads/docentes/' + id + '.jpg';
        await fotoPerfil.mv(uploadPath);
    }
    res.redirect('/docentes');
}