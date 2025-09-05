exports.checkUser = (req, res, next) => {
    if (!req.session.userEmail) {
        res.redirect("/login");
        return;
    }
    res.locals.userEmail = req.session.userEmail;
    res.locals.nombreCompleto = req.session.nombreCompleto;
    next();
}