const express = require("express");
const FabricanteController = require("../controllers/fabricantesController");
const router = express.Router();
const ctrl = new FabricanteController();

router.get("/agregar", ctrl.getFabricantesAgregarController);
router.get("/", ctrl.getFabricantesObtenerController);
router.get("/editar/:id", ctrl.getFabricantesObtenerIdController);
router.use("/eliminar/:id", ctrl.deleteFabricantesEliminarController);

/* Sanitizar los campos  */
router.post("/insertar", ctrl.postFabricantesInsertarController);
router.put("/actualizar/", ctrl.putFabricantesActualizatController);
module.exports = router;
