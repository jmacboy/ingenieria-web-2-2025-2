const { checkUser } = require("../middlewares/check-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/estudiante.controller.js");

    router.get("/", checkUser, controller.getEstudianteList);
    router.get("/create", checkUser, controller.getEstudianteInsert);
    router.post("/create", checkUser, controller.postEstudianteInsert);
    router.get("/:id", checkUser, controller.getEstudianteUpdate);
    router.post("/:id", checkUser, controller.postEstudianteUpdate);
    router.post("/:id/delete", checkUser, controller.postEstudianteDelete);
    router.get("/:id/profile", checkUser, controller.getEstudianteProfilePicture);
    router.post("/:id/profile", checkUser, controller.postEstudianteProfilePicture);

    app.use('/estudiantes', router);
};