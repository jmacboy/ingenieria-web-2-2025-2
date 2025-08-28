
module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/persona.controller.js");

    router.get("/", controller.getPersonaList);
    router.get("/create", controller.getPersonaInsert);
    router.post("/create", controller.postPersonaInsert);
    router.get("/:id", controller.getPersonaUpdate);
    router.post("/:id", controller.postPersonaUpdate);
    router.post("/:id/delete", controller.postPersonaDelete);

    app.use('/personas', router);
};