const pool = require("../conexion");

class ClienteController {
  getClientesController(req, res) {
    pool
      .query("SELECT * FROM clientes")
      .then((clientes) => {
        res.status(200).render("clientes/ver", {
          clientes,
        });
      })
      .catch((e) => {
        res.status(500).json(e).redirect("/carros");
      });
  }
  getClientesAgregarController(req, res) {
    res.render("clientes/agregar");
  }
  deleteClientesController(req, res) {
    const { id } = req.params;
    pool
      .query("DELETE from clientes WHERE id = ?", [id])
      .then(() => {
        req.flash("exito", "Cliente eliminado correctamente");
        res.redirect("/clientes");
      })
      .catch((e) => {
        res.status(500).json(e).redirect("/clientes");
      });
  }
  getClientesEditarController(req, res) {
    const { id } = req.params;
    pool
      .query("SELECT * FROM clientes WHERE id = ?", [id])
      .then((datos) => {
        if (datos.length <= 0) {
          res.redirect("/clientes");
          return;
        }
        const [cliente] = datos;
        res.status(200).render("clientes/editar", {
          cliente,
        });
      })
      .catch((e) => {
        res.status(500).json(e).redirect("/clientes");
      });
  }
  postClientesAgregarController(req, res) {
    const { cedula, nombre, telefono, direccion } = req.body;
    if (!cedula || !nombre || !telefono || !direccion) {
      req.flash("error", "Todos los campos son necesarios");
      res.redirect("/clientes/agregar");
      return;
    }
    pool
      .query(
        "INSERT INTO clientes (cedula, nombre, telefono, direccion) VALUES (?,?,?,?)",
        [cedula, nombre, telefono, direccion]
      )
      .then(() => {
        req.flash("exito", "Cliente añadido correctamente");
        res.status(201).redirect("/clientes");
      })
      .catch((e) => {
        res.status(500).json(e).redirect("/clientes");
      });
  }
  putClientesActualizarController(req, res) {
    const { id, cedula, nombre, telefono, direccion } = req.body;
    if (!nombre || !telefono || !direccion || !id) {
      req.flash("error", "Todos los campos son necesarios para actualizar");
      return res.redirect("/clientes");
    }
    pool
      .query(
        "UPDATE clientes SET cedula = ?, nombre = ?, telefono = ?, direccion = ?  WHERE id = ?",
        [cedula, nombre, telefono, direccion, id]
      )
      .then(() => {
        req.flash("exito", "Cliente actualizado correctamente");
        res.status(201).redirect("/clientes");
      })
      .catch((e) => {
        console.log(e);
        res.redirect("/clientes");
        return;
      });
  }
}
module.exports = ClienteController;
