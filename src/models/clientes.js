const conexion = require("../conexion")
module.exports = {
  
	async insertar(cedula, nombre, telefono, direccion) {  // modulo usando async await
        let resultados = await conexion.query(`insert into clientes
        (cedula, nombre, telefono, direccion)
        values
        (?, ?, ?, ?)`, [cedula, nombre, telefono, direccion]);
        return resultados;
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, cedula, nombre, telefono, direccion from clientes`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, cedula, nombre, telefono, direccion from clientes where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    }, 
   /* actualizar(id, nombre, precio) {
        return new Promise((resolve, reject) => {
            conexion.query(`update productos
            set nombre = ?,
            precio = ?
            where id = ?`,
                [nombre, precio, id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    }, */
	async actualizar(id, nombre, telefono, direccion) {   // modulo usando async await
        const resultados = conexion.query(`update clientes
		set nombre = ?,
		telefono = ?,
		direccion = ?
        where id = ?`, [nombre, telefono, direccion, id]);
        return resultados;
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from clientes
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
}