const pool = require("../conexion");

class FabricanteController {
  getFabricantesAgregarController(req, res) {
    res.render("fabricantes/agregar");
  }
  getFabricantesObtenerController(req, res) {
    pool
      .query("SELECT * FROM fabricantes")
      .then((fabricantes) => {
        res.render("fabricantes/ver", {
          fabricantes,
        });
      })
      .catch((e) => {
        req.flash("error", "No se pudo obtener los datos");
        res.status(500).redirect("/clientes");
      });
  }
  getFabricantesObtenerIdController(req, res) {
    const { id } = req.params;
    pool
      .query("SELECT * FROM fabricantes WHERE id = ?", [id])
      .then((datos) => {
        if (datos.length <= 0) {
          res.redirect("/fabricantes");
          return;
        }
        const [fabricante] = datos;
        res.render("fabricantes/editar", {
          fabricante,
        });
      })
      .catch((e) => {
        res.status(500).redirect("/fabricantes");
      });
  }
  deleteFabricantesEliminarController(req, res) {
    const { id } = req.params;
    pool
      .query("DELETE FROM fabricantes WHERE id = ?", [id])
      .then(({ affectedRows }) => {
        if (affectedRows === 0) {
          req.flash("error", "Id no encontrado");
          res.redirect("/fabricantes");
          return;
        }
        req.flash("exito", "Fabricante eliminado de la Concesionaria");
        res.redirect("/fabricantes");
        return;
      })
      .catch((e) => {
        return res.status(500).redirect("/fabricantes");
      });
  }
  postFabricantesInsertarController(req, res) {
    /* MENSAJE FLASH DE ERROR A LA VISTA */
    const { rif, nombre, telefono, direccion, contacto } = req.body;
    if (!rif || !nombre || !telefono || !direccion || !contacto) {
      /* SA NITIZAR */
      return res
        .status(500)
        .send("No hay rif, nombre, telefono, direccion o contacto");
    }
    pool
      .query(
        "INSERT INTO fabricantes (rif, nombre, telefono, direccion, contacto) VALUES (?,?,?,?,?)",
        [rif, nombre, telefono, direccion, contacto]
      )
      .then(() => {
        /* MENSAJE FLASH DE ERROR A LA VISTA */
        req.flash("exito", "Fabricante agregado exitosamente");
        res.redirect("/fabricantes");
      })
      .catch((e) => {
        res.status(500).redirect("/fabricantes");
      });
  }
  putFabricantesActualizatController(req, res) {
    const { id, nombre, telefono, direccion, contacto } = req.body;
    if (!nombre || !telefono || !direccion || !id || !contacto) {
      /* MANDAR MENSAJE FLASH A LA VISTA D FAVRICANTES */
      return res.status(500).send("No hay suficientes datos");
    }
    pool
      .query(
        "UPDATE fabricantes SET nombre = ?, telefono = ?, direccion = ?, contacto = ? WHERE id = ?",
        [nombre, telefono, direccion, contacto, id]
      )
      .then(() => {
        req.flash("exito", "Fabricante actualizado correctamente");
        res.redirect("/fabricantes");
      })
      .catch((e) => {
        res.status(500).redirect("/");
      });
  }
}
module.exports = FabricanteController;
