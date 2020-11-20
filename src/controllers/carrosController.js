const pool = require("../conexion");
class CarrosController {
  async getController(req, res) {
    try {
      const carros = await pool.query(
        `select id, nombre, año, marca, especificaciones, precio from carros`
      );
      res.render("carros/ver", {
        carros,
      });
    } catch (error) {
      res.render("carros/ver", {
        carros,
        error: "Ha ocurrido un error inesperado",
      });
    }
  }
  async agregarGetController(req, res, next) {
    try {
      const fabricantes = await pool.query("SELECT * FROM fabricantes");
      res.render("carros/agregar", {
        fabricantes,
      });
    } catch (error) {
      res.render("carros/agregar", {
        fabricantes,
        error: "Ha ocurrido un error obteniendo los fabricantes",
      });
    }
  }
  async agregarPostController(req, res) {
    const fabricantes = await pool.query("SELECT * FROM fabricantes");
    const { nombre, año, marca, especificaciones, precio } = req.body;
    if (!nombre || !año || !marca || !especificaciones || !precio) {
      res.render("carros/agregar", {
        error: "Todos los datos son necesarios",
        fabricantes,
      });
      return;
    }
    try {
      const fabrica = await pool.query(
        "SELECT * FROM fabricantes WHERE nombre = ?",
        [marca]
      );
      const [marcaResul] = fabrica;
      const { id } = marcaResul;
      await pool.query(
        `insert into carros (nombre, año, marca, especificaciones, precio, fabricanteId) values (?, ?, ?, ?, ?,?)`,
        [nombre, año, marca, especificaciones, precio, id]
      );
      res.redirect("/carros");
    } catch (error) {
      res.render("carros/agregar", {
        error: "Ha ocurrido un error al insertar el carro en la base de datos",
        fabricantes,
      });
    }
  }
  async ObtenerIdController(req, res) {
    const { id } = req.params;
    try {
      const fabricantes = await pool.query("SELECT * FROM fabricantes");
      const editar = await pool.query(`select * from carros where id = ?`, [
        id,
      ]);
      const [carro] = editar;
      res.render("carros/editar", {
        carro,
        fabricantes,
      });
    } catch (error) {
      res.render("carros/editar", {
        carro,
        fabricantes,
        error: "Ha ocurrrido un error editando el registro",
      });
    }
  }
  async eliminarCarro(req, res) {
    const { id } = req.params;
    try {
      await pool.query(`delete from carros where id = ?`, [id]);
      res.redirect("/carros");
    } catch (error) {
      res.redirect("/carros");
    }
  }
  async actualizarCarro(req, res) {
    const { id, nombre, año, marca, especificaciones, precio } = req.body;
    if (!nombre || !año || !marca || !especificaciones || !precio) {
      res.redirect("/carros");
    }
    try {
      const fabrica = await pool.query(
        "SELECT * FROM fabricantes WHERE nombre = ?",
        [marca]
      );
      const [datos] = fabrica;
      const { id: fabricanteId } = datos;
      await pool.query(
        `UPDATE carros
          set nombre = ?,
          año = ?,
          marca = ?,
          especificaciones = ?,
          precio = ?,
          fabricanteId = ?
          WHERE id = ?`,
        [nombre, año, marca, especificaciones, precio, fabricanteId, id]
      );
      res.redirect("/carros");
    } catch (error) {
      res.redirect("/carros");
    }
  }
}
module.exports = CarrosController;
