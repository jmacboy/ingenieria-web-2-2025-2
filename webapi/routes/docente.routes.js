const { docenteSchema, docenteOptionalSchema } = require("../validators/docenteSchema.js");
const validateJson = require("../middlewares/validation.middleware.js");
const isJsonRequestValid = require("../middlewares/isJsonRequestValid.middleware.js");
const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const db = require("../models/index.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/docente.controller.js");

    router.get("/", controller.getAllDocentes);
    router.post("/", isJsonRequestValid, validateJson(docenteSchema), controller.insertDocente);
    router.put("/:id", isJsonRequestValid, validateJson(docenteSchema), getObjectOr404(db.docente, { include: 'persona' }), controller.updateDocentePut);
    router.patch("/:id", isJsonRequestValid, validateJson(docenteOptionalSchema), getObjectOr404(db.docente, { include: 'persona' }), controller.updateDocentePatch);
    router.get("/:id", getObjectOr404(db.docente, { include: 'persona' }), controller.getDocenteById);
    router.delete("/:id", getObjectOr404(db.docente, { include: 'persona' }), controller.deleteDocente);
    app.use('/docentes', router);
};