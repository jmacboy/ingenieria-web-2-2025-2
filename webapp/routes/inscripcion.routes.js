const { checkUser } = require("../middlewares/check-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/inscripcion.controller.js");

    router.get("/:id/enrollment", checkUser, controller.getInscripcionCreate);
    router.post("/:id/enrollment", checkUser, controller.postInscripcionCreate);

    app.use('/inscripciones', router);
};