const express = require('express');
const router = express.Router();

const carrosModel = require("../models/carros");

router.get('/', function (req, res, next) {
   if(req.session.loggedin)	{ 
	 carrosModel
        .obtener()
        .then(carros => {
            res.render("carros/ver", {
                carros: carros,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo carros");
        });
   }
   else {
	  
	  res.render("login/login");
  }	
});
router.get('/agregar', function (req, res, next) {
    res.render("carros/agregar");
});
router.post('/insertar', function (req, res, next) {
   // Obtener el nombre marca, especificaciones y precio. Es lo mismo que
    // const nombre = req.body.nombre;
	//const marca = req.body.marca;
	//const especificaciones = req.body.especificaciones;
    // const precio = req.body.precio;  
    const { nombre, año, marca, especificaciones, precio } = req.body;
    if (!nombre || !año || !marca || !especificaciones || !precio) {
        return res.status(500).send("No hay nombre, año, marca, especificaciones o precio");
    }
    // Si todo sale bien, seguimos
    carrosModel
        .insertar(nombre, año, marca, especificaciones, precio)
        .then(idcarroInsertado => {
            res.redirect("/carros");
        })
        .catch(err => {
            return res.status(500).send("Error insertando carro");
        });
});
router.get('/eliminar/:id', function (req, res, next) {
    carrosModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/carros");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando");
        });
});
router.get('/editar/:id', function (req, res, next) {
    carrosModel
        .obtenerPorId(req.params.id)
        .then(carro => {
            if (carro) {
                res.render("carros/editar", {
                    carro: carro,
                });
            } else {
                return res.status(500).send("No existe un carro con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo carro");
        });
});
router.post('/actualizar/', function (req, res, next) {
    // Obtener el nombre marca, especificaciones y precio. Es lo mismo que
    // const nombre = req.body.nombre;
	//const marca = req.body.marca;
	//const especificaciones = req.body.especificaciones;
    // const precio = req.body.precio;   
    const { id, nombre, año, marca, especificaciones, precio } = req.body;
    if (!nombre || !año || !marca || !especificaciones || !precio || !id) {
        return res.status(500).send("No hay suficientes datos");
    }
    // Si todo sale bien, seguimos
    carrosModel
        .actualizar(id, nombre, año, marca, especificaciones, precio)
        .then(() => {
            res.redirect("/carros");
        })
        .catch(err => {
            return res.status(500).send("Error actualizando carro");
        });
});
module.exports = router;
