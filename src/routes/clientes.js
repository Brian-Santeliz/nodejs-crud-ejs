const express = require('express');
const router = express.Router();

const clientesModel = require("../models/clientes");

router.get('/', function (req, res, next) {
   if(req.session.loggedin)	{
    clientesModel
        .obtener()
        .then(clientes => {
            res.render("clientes/ver", {
                clientes: clientes,
            });
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo clientes");
        });
   }
  else {
	  
	  res.render("login/login");
  }	  
});
router.get('/agregar', function (req, res, next) {
    res.render("clientes/agregar");
});
router.post('/insertar', function (req, res, next) {
   // Obtener el nombre marca, especificaciones y precio. Es lo mismo que
    // const nombre = req.body.nombre;
	//const marca = req.body.marca;
	//const especificaciones = req.body.especificaciones;
    // const precio = req.body.precio;
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
        .catch(err => {
            return res.status(500).send("Error insertando clientes");
        });
});
router.get('/eliminar/:id', function (req, res, next) {
    clientesModel
        .eliminar(req.params.id)
        .then(() => {
            res.redirect("/clientes");
        })
        .catch(err => {
            return res.status(500).send("Error eliminando");
        });
});
router.get('/editar/:id', function (req, res, next) {
    clientesModel
        .obtenerPorId(req.params.id)
        .then(cliente => {
            if (cliente) {
                res.render("clientes/editar", {
                    cliente: cliente,
                });
            } else {
                return res.status(500).send("No existe un cliente con ese id");
            }
        })
        .catch(err => {
            return res.status(500).send("Error obteniendo producto");
        });
});
router.post('/actualizar/', function (req, res, next) {
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
        .catch(err => {
            return res.status(500).send("Error actualizando cliente");
        });
});
module.exports = router;
