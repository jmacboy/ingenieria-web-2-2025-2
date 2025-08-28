
module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/home.controller.js");

    router.get("/", controller.getRoot);
    router.get("/prueba", controller.getPrueba);
    router.get("/hola", controller.getHola);
    router.get("/form", controller.getForm);
    router.post("/form-submit", controller.postFormSubmit);
    router.get("/search", controller.getMateriaSearch);

    app.use('/', router);
};