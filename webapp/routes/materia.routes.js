
module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/materia.controller.js");

    router.get("/", controller.getMateriaList);
    router.get("/create", controller.getMateriaCreate);
    router.post("/create", controller.postMateriaCreate);
    router.get("/:id", controller.getMateriaById);
    router.post("/:id", controller.postMateriaUpdate);
    router.post("/:id/delete", controller.postMateriaDelete);

    app.use('/materias', router);
};