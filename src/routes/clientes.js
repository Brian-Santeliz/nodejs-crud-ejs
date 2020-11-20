const { Router } = require("express");
const ClienteController = require("../controllers/clientesController");
const router = Router();
const ctrl = new ClienteController();
const clientesModel = require("../models/clientes");

//RUTAS POST AGREGAR VALIDARLAS CON EXPRESS-VALIDATOR
router.get("/", ctrl.getClientesController);
router.get("/agregar", ctrl.getClientesAgregarController);
router.use("/eliminar/:id", ctrl.deleteClientesController);

router.post("/insertar", function (req, res, next) {
  const { cedula, nombre, telefono, direccion } = req.body;
  if (!cedula || !nombre || !telefono || !direccion) {
    return res.status(500).send("No hay cedula, nombre, telefono o direccion");
  }
  // Si todo sale bien, seguimos
  clientesModel
    .insertar(cedula, nombre, telefono, direccion)
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((err) => {
      return res.status(500).send("Error insertando clientes");
    });
});
router.get("/editar/:id", function (req, res, next) {
  clientesModel
    .obtenerPorId(req.params.id)
    .then((cliente) => {
      if (cliente) {
        res.render("clientes/editar", {
          cliente: cliente,
        });
      } else {
        return res.status(500).send("No existe un cliente con ese id");
      }
    })
    .catch((err) => {
      return res.status(500).send("Error obteniendo producto");
    });
});
router.post("/actualizar/", function (req, res, next) {
  const { id, nombre, telefono, direccion } = req.body;
  if (!nombre || !telefono || !direccion || !id) {
    return res.status(500).send("No hay suficientes datos");
  }
  // Si todo sale bien, seguimos
  clientesModel
    .actualizar(id, nombre, telefono, direccion)
    .then(() => {
      res.redirect("/clientes");
    })
    .catch((err) => {
      return res.status(500).send("Error actualizando cliente");
    });
});
module.exports = router;
