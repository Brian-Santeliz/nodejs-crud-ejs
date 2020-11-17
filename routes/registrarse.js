const express = require('express');
const router = express.Router();
const registrarseModel = require("../models/registrarse");
router.get('/', function (req, res, next) {
    res.render("registrarse/agregar");
});
router.post('/insertar', function (req, res, next) {
    const { usuario, clave } = req.body;
    if (!usuario || !clave ) {
        return res.status(500).send("No hay usuario o clave");
    }
    // Si todo sale bien, seguimos
    registrarseModel
        .insertar(usuario, clave)
        .then(() => {
            res.redirect("/login");
        })
        .catch(err => {
            return res.status(500).send("Error registrando usuario");
        });
});
module.exports = router;