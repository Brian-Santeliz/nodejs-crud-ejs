const pool = require("../conexion");

class ClienteController {
  getClientesController(req, res) {
    pool
      .query("SELECT * FROM clientes")
      .then((clientes) => {
        res.render("clientes/ver", {
          clientes,
        });
      })
      .catch((e) => {
        res.status(500).josn(e);
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
        res.redirect("/clientes");
      })
      .catch((e) => {
        res.status(500).json(e);
        res.redirect("/clientes");
      });
  }
  getClientesEditarController(req, res) {
    res.render("clientes/editar", {
      cliente: cliente,
    });
  }
}
module.exports = ClienteController;
