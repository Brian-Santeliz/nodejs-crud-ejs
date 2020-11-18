const express = require("express");
const RegistroController = require("../controllers/registroController");
const router = express.Router();
const ctrl = new RegistroController();

router.get("/", ctrl.getRegistro);
router.post("/insertar", ctrl.postRegistro);
module.exports = router;
