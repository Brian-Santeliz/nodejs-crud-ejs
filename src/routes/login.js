const express = require('express');
const router = express.Router();
const loginModel = require("../models/login");
router.get('/', function (req, res, next) {
    res.render("login/login");
});
router.post('/login', function (req, res, next) {
    const { usuario, clave } = req.body;
    if (!usuario || !clave) {
        return res.status(500).send("No hay Usuario o Clave");
    }
    // Si todo sale bien, seguimos
    loginModel
        .buscarusuario(usuario, clave)
        .then(login => {
			if (login) {
			req.session.loggedin =true;
			req.session.usuario = usuario;
            res.redirect("/carros");
			}
			else {
				res.send('Usuario o Password Incorrecto');
			}
			})
        .catch(err => {
            return res.status(500).send("Error de credenciales");
        });		
});

module.exports = router;
