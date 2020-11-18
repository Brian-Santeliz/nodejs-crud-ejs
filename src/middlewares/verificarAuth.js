class Verificar {
  static auth(req, res, next) {
    if (!req.session.loggedin) {
      res.redirect("/login");
      return;
    }
    next();
  }
}
module.exports = Verificar;
