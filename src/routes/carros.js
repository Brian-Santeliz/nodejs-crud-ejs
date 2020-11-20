const express = require("express");
const CarrosController = require("../controllers/carrosController");
const { body } = require("express-validator");
const router = express.Router();
const ctrl = new CarrosController();

router.get("/", ctrl.getController);
router.get("/agregar", ctrl.agregarGetController);
router.use("/eliminar/:id", ctrl.eliminarCarro);
router.get("/editar/:id", ctrl.ObtenerIdController);

//SANITIZAR LAS RUTAS
router.post(
  "/insertar",
  [body("nombre").notEmpty().trim()],
  [body("año").notEmpty().trim().isNumeric()],
  [body("marca").notEmpty()],
  [body("especificaciones").notEmpty().trim()],
  [body("precio").notEmpty().trim().isNumeric()],
  ctrl.agregarPostController
);
router.post("/actualizar", ctrl.actualizarCarro);
module.exports = router;
