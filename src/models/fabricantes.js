const conexion = require("../conexion")
module.exports = {
  
	async insertar(rif, nombre, telefono, direccion, contacto) {  // modulo usando async await
        let resultados = await conexion.query(`insert into fabricantes
        (rif, nombre, telefono, direccion, contacto)
        values
        (?, ?, ?, ?, ?)`, [rif, nombre, telefono, direccion, contacto]);
        return resultados;
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, rif, nombre, telefono, direccion, contacto from fabricantes`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, rif, nombre, telefono, direccion, contacto from fabricantes where id = ?`,
                [id],
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados[0]);
                });
        });
    }, 
   /* actualizar(id, nombre, precio) {
        return new Promise((resolve, reject) => {
            conexion.query(`update carros
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
	async actualizar(id, nombre, telefono, direccion, contacto) {   // modulo usando async await
        const resultados = conexion.query(`update fabricantes
		set nombre = ?,
		telefono = ?,
		direccion = ?,
		contacto = ?
        where id = ?`, [nombre, telefono, direccion, contacto, id]);
        return resultados;
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from fabricantes
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
	
}