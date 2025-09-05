const { checkUser } = require("../middlewares/check-user.js");

module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/docente.controller.js");

    router.get("/", checkUser, controller.getDocenteList);
    router.get("/create", checkUser, controller.getDocenteInsert);
    router.post("/create", checkUser, controller.postDocenteInsert);
    router.get("/:id", checkUser, controller.getDocenteUpdate);
    router.post("/:id", checkUser, controller.postDocenteUpdate);
    router.post("/:id/delete", checkUser, controller.postDocenteDelete);
    router.get("/:id/profile", checkUser, controller.getDocenteProfilePicture);
    router.post("/:id/profile", checkUser, controller.postDocenteProfilePicture);

    app.use('/docentes', router);
};