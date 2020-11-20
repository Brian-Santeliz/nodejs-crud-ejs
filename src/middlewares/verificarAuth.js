class Verificar {
  static auth(req, res, next) {
    if (!req.session.loggedin) {
      res.redirect("/login");
      return;
    }
    next();
  }
  static sessionActiva(req, res, next) {
    if (req.session.usuario) {
      res.locals.usuario = req.session.usuario;
    }
    next();
  }
}
module.exports = Verificar;
