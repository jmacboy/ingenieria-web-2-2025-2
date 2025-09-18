const { personaSchema, personaOptionalSchema, personaSearchSchema } = require("../validators/personaSchema.js");
const validateJson = require("../middlewares/validation.middleware.js");
const isJsonRequestValid = require("../middlewares/isJsonRequestValid.middleware.js");
const getObjectOr404 = require("../middlewares/getObjectOr404.middleware.js");
const db = require("../models");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");

    router.get("/", controller.getAllPersonas);
    router.post("/", isJsonRequestValid, validateJson(personaSchema), controller.insertPersona);
    router.put("/:id", isJsonRequestValid, validateJson(personaSchema), getObjectOr404(db.persona), controller.updatePersonaPut);
    router.patch("/:id", isJsonRequestValid, validateJson(personaOptionalSchema), getObjectOr404(db.persona), controller.updatePersonaPatch);
    router.get("/:id", getObjectOr404(db.persona), controller.getPersonaById);
    router.delete("/:id", getObjectOr404(db.persona), controller.deletePersona);
    router.post("/search", validateJson(personaSearchSchema), controller.searchPersonas);
    app.use('/personas', router);
};