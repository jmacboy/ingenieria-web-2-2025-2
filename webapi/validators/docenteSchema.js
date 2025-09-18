const Joi = require('joi');
const docenteSchema = Joi.object({
    nombre: Joi.string().min(1).max(100).required(),
    apellido: Joi.string().min(1).max(100).required(),
    edad: Joi.number().min(0).required(),
    ciudad: Joi.string().min(1).max(100).optional(),
    fechaNacimiento: Joi.date().optional(),
    telefono: Joi.string().min(7).max(15).required(),
    email: Joi.string().email().required()
});
const docenteOptionalSchema = Joi.object({
    nombre: Joi.string().min(1).max(100).optional(),
    apellido: Joi.string().min(1).max(100).optional(),
    edad: Joi.number().min(0).optional(),
    ciudad: Joi.string().min(1).max(100).optional(),
    fechaNacimiento: Joi.date().optional(),
    telefono: Joi.string().min(7).max(15).optional(),
    email: Joi.string().email().optional()
});
module.exports = {
    docenteSchema,
    docenteOptionalSchema

};
