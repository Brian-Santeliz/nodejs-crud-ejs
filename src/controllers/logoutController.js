class LogoutController {
  static logout(req, res) {
    req.session.destroy();
    res.redirect("/login");
  }
}
module.exports = LogoutController;
