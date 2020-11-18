const pool = require("../conexion");
class CarrosController {
  async getController(req, res) {
    const carros = await pool.query(
      `select id, nombre, año, marca, especificaciones, precio from carros`
    );
    res.render("carros/ver", {
      carros,
    });
  }
}
module.exports = CarrosController;
