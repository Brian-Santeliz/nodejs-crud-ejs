const pool = require("../conexion");
const bcrypt = require("bcrypt");
class RegistroController {
  getRegistro(req, res) {
    res.render("registrarse/agregar");
  }
  async postRegistro(req, res) {
    const { usuario, clave, repetir } = req.body;
    console.log(typeof usuario);
    if (!usuario || !clave || !repetir) {
      res.render("registrarse/agregar", {
        error: "Los datos solicitados son necesarios",
      });
      return;
    }
    if (clave !== repetir) {
      res.render("registrarse/agregar", {
        error: "Las contraseñas no coinciden",
      });
      return;
    }
    const usuarioExistente = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = ?",
      [usuario]
    );
    if (usuarioExistente.length > 0) {
      res.render("registrarse/agregar", {
        error: "Este usuario se encuentra registrado",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const nuevaClave = await bcrypt.hash(clave, salt);
    //TODO no registrar mas de un usuario
    try {
      await pool.query(
        `insert into usuarios
              (usuario, clave)
              values
              (?, ?)`,
        [usuario, nuevaClave]
      );
      res.redirect("/login");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = RegistroController;
