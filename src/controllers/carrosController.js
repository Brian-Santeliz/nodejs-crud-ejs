const pool = require("../conexion");
class CarrosController {
  async getCarrosController(req, res) {
    try {
      const carros = await pool.query(`SELECT * from carros`);
      res.status(200).render("carros/ver", {
        carros,
      });
    } catch (error) {
      res.render("carros/ver", {
        carros,
        error: "Ha ocurrido un error inesperado",
      });
    }
  }
  async getCarrosAgregarController(req, res, next) {
    try {
      const fabricantes = await pool.query("SELECT * FROM fabricantes");
      res.status(200).render("carros/agregar", {
        fabricantes,
      });
    } catch (error) {
      res.status(500).render("carros/agregar", {
        fabricantes,
        error: "Ha ocurrido un error obteniendo los fabricantes",
      });
    }
  }
  async postCarrosAgregarController(req, res) {
    const fabricantes = await pool.query("SELECT * FROM fabricantes");
    const { nombre, año, marca, especificaciones, precio } = req.body;
    if (!nombre || !año || !marca || !especificaciones || !precio) {
      res.status(200).render("carros/agregar", {
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
        `INSERT INTO carros (nombre, año, marca, especificaciones, precio, fabricanteId) VALUES (?, ?, ?, ?, ?,?)`,
        [nombre, año, marca, especificaciones, precio, id]
      );
      res.status(201).redirect("/carros");
    } catch (error) {
      res.status(500).render("carros/agregar", {
        error: "Ha ocurrido un error al insertar el carro en la base de datos",
        fabricantes,
      });
    }
  }
  async getCarrosObtenerIdController(req, res) {
    const { id } = req.params;
    try {
      const fabricantes = await pool.query("SELECT * FROM fabricantes");
      const editar = await pool.query(`SELECT * FROM carros WHERE id = ?`, [
        id,
      ]);
      if (editar.length <= 0) {
        res.status(204).redirect("/carros");
        return;
      }
      const [carro] = editar;
      res.status(200).render("carros/editar", {
        carro,
        fabricantes,
      });
    } catch (error) {
      res.status(500).render("carros/editar", {
        carro,
        fabricantes,
        error: "Ha ocurrrido un error editando el registro",
      });
    }
  }
  async deleteCarrosEliminarController(req, res) {
    const { id } = req.params;
    try {
      await pool.query(`DELETE FROM carros WHERE id = ?`, [id]);
      req.flash("exito", "Carro eliminado correctamente");
      res.status(200).redirect("/carros");
    } catch (error) {
      res.status(500).json(error).redirect("/carros");
    }
  }
  async putCarrosActualizarController(req, res) {
    const { id, nombre, año, marca, especificaciones, precio } = req.body;
    if (!nombre || !año || !marca || !especificaciones || !precio) {
      res.redirect("/carros");
      return;
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
          SET nombre = ?,
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
      res.status(500).json(erro).redirect("/carros");
    }
  }
}
module.exports = CarrosController;
