const express = require("express");
const router = express.Router();

const fabricantesModel = require("../models/fabricantes");

router.get("/", function (req, res, next) {
  fabricantesModel
    .obtener()
    .then((fabricantes) => {
      res.render("fabricantes/ver", {
        fabricantes: fabricantes,
      });
    })
    .catch((err) => {
      return res.status(500).send("Error obteniendo fabricantes");
    });
});
router.get("/agregar", function (req, res, next) {
  res.render("fabricantes/agregar");
});
router.post("/insertar", function (req, res, next) {
  const { rif, nombre, telefono, direccion, contacto } = req.body;
  if (!rif || !nombre || !telefono || !direccion || !contacto) {
    return res
      .status(500)
      .send("No hay rif, nombre, telefono, direccion o contacto");
  }
  // Si todo sale bien, seguimos
  fabricantesModel
    .insertar(rif, nombre, telefono, direccion, contacto)
    .then(() => {
      res.redirect("/fabricantes");
    })
    .catch((err) => {
      return res.status(500).send("Error insertando fabricantes");
    });
});
router.get("/eliminar/:id", function (req, res, next) {
  fabricantesModel
    .eliminar(req.params.id)
    .then(() => {
      res.redirect("/fabricantes");
    })
    .catch((err) => {
      return res.status(500).send("Error eliminando fabricantes");
    });
});
router.get("/editar/:id", function (req, res, next) {
  fabricantesModel
    .obtenerPorId(req.params.id)
    .then((fabricante) => {
      if (fabricante) {
        res.render("fabricantes/editar", {
          fabricante: fabricante,
        });
      } else {
        return res.status(500).send("No existe un fabricante con ese id");
      }
    })
    .catch((err) => {
      return res.status(500).send("Error obteniendo fabricante");
    });
});
router.post("/actualizar/", function (req, res, next) {
  const { id, nombre, telefono, direccion, contacto } = req.body;
  if (!nombre || !telefono || !direccion || !id || !contacto) {
    return res.status(500).send("No hay suficientes datos");
  }
  // Si todo sale bien, seguimos
  fabricantesModel
    .actualizar(id, nombre, telefono, direccion, contacto)
    .then(() => {
      res.redirect("/fabricantes");
    })
    .catch((err) => {
      return res.status(500).send("Error actualizando fabricante");
    });
});
module.exports = router;
