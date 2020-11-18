const conexion = require("../conexion")
module.exports = {
  /*  insertar(nombre, precio) {
        return new Promise((resolve, reject) => {
            conexion.query(`insert into productos
            (nombre, precio)
            values
            (?, ?)`,
                [nombre, precio], (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados.insertId);
                });
        });
    }, */   
	async insertar(nombre, año, marca, especificaciones, precio) {  // modulo usando async await
        let resultados = await conexion.query(`insert into carros
        (nombre, año, marca, especificaciones, precio)
        values
        (?, ?, ?, ?, ?)`, [nombre, año, marca, especificaciones, precio]);
        return resultados;
    },
    obtener() {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, año, marca, especificaciones, precio from carros`,
                (err, resultados) => {
                    if (err) reject(err);
                    else resolve(resultados);
                });
        });
    },
    obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`select id, nombre, año, marca, especificaciones, precio from carros where id = ?`,
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
	async actualizar(id, nombre, año, marca, especificaciones, precio) {   // modulo usando async await
        const resultados = conexion.query(`update carros
        set nombre = ?,
        año = ?,
		marca = ?,
		especificaciones = ?,
        precio = ?
        where id = ?`, [nombre, año, marca, especificaciones, precio, id]);
        return resultados;
    },
    eliminar(id) {
        return new Promise((resolve, reject) => {
            conexion.query(`delete from carros
            where id = ?`,
                [id],
                (err) => {
                    if (err) reject(err);
                    else resolve();
                });
        });
    },
	
}