const db = require("../models");
exports.getAllDocentes = async (req, res) => {
    const docentes = await db.docente.findAll({
        include: 'persona'
    });
    res.json(docentes);
}
exports.getDocenteById = async (req, res) => {
    const docente = req.obj;
    res.json(docente);
}
exports.insertDocente = async (req, res) => {

    const { nombre, apellido, edad, ciudad, fechaNacimiento, telefono, email } = req.body;

    try {
        const nuevaPersona = await db.persona.create({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        });

        const nuevaDocente = await db.docente.create({
            idPersona: nuevaPersona.id,
            telefono,
            email
        });
        res.status(201).json(nuevaDocente);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear el docente' });
    }
}
exports.updateDocentePatch = async (req, res) => {
    const { nombre, apellido, edad, ciudad, fechaNacimiento, telefono, email } = req.body;

    try {
        const docente = req.obj;
        const persona = await db.persona.findByPk(docente.idPersona);

        if (nombre) {
            persona.nombre = nombre;
        }
        if (apellido) {
            persona.apellido = apellido;
        }
        if (edad) {
            persona.edad = edad;
        }
        if (ciudad) {
            persona.ciudad = ciudad;
        }
        if (fechaNacimiento) {
            persona.fechaNacimiento = fechaNacimiento;
        }
        await persona.save();

        if (telefono) {
            docente.telefono = telefono;
        }
        if (email) {
            docente.email = email;
        }

        await docente.save();

        const updatedDocente = await db.docente.findByPk(docente.id, { include: 'persona' });
        res.json(updatedDocente);
    } catch (error) {
        console.error(error);

        return res.status(500).json({ error: 'Error al actualizar el docente' });
    }
}
exports.updateDocentePut = async (req, res) => {

    const { nombre, apellido, edad, ciudad, fechaNacimiento, telefono, email } = req.body;
    try {
        const docente = req.obj;
        const persona = await db.persona.findByPk(docente.idPersona);

        persona.nombre = nombre;
        persona.apellido = apellido;
        persona.edad = edad;
        if (ciudad) {
            persona.ciudad = ciudad;
        }
        if (fechaNacimiento) {
            persona.fechaNacimiento = fechaNacimiento;
        }
        await persona.save();

        docente.telefono = telefono;
        docente.email = email;
        await docente.save();

        const updatedDocente = await db.docente.findByPk(docente.id, { include: 'persona' });
        res.json(updatedDocente);
    } catch (error) {
        console.error(error);

        return res.status(500).json({ error: 'Error al actualizar el docente' });
    }
}
exports.deleteDocente = async (req, res) => {
    try {
        const docente = req.obj;
        await docente.destroy();
        const persona = await db.persona.findByPk(docente.idPersona);

        if (persona) {
            await persona.destroy();
        }
        res.json({ message: 'Docente eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el docente' });
    }
}
