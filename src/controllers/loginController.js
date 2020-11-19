const pool = require("../conexion");
const bcrtpt = require("bcrypt");
class LoginController {
  getController(req, res) {
    res.render("login/login");
  }
  async postController(req, res) {
    const { usuario, clave } = req.body;
    if (!usuario || !clave) {
      res.render("login/login", {
        error: "Los datos solicitados son necesarios",
      });
      return;
    }
    try {
      const usuarioBd = await pool.query(
        "SELECT * FROM usuarios WHERE usuario = ?",
        [usuario]
      );
      if (usuarioBd.length <= 0) {
        res.render("login/login", {
          error: "Este usuario no esta registrado",
        });
        return;
      }
      const [usuarioEncontrado] = usuarioBd;
      const claveHash = usuarioEncontrado.clave;
      const response = await bcrtpt.compare(clave, claveHash);
      if (!response) {
        res.render("login/login", {
          error: "la contraseña no es correcta",
        });
        return;
      }
      req.session.loggedin = true;
      req.session.usuario = usuarioEncontrado.usuario;
      res.redirect("/carros");
      return;
    } catch (error) {
      res.render("login/login", {
        error: "Ha ocurrido un error en el server",
      });
      return;
    }
  }
}
module.exports = LoginController;
