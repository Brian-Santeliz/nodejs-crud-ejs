const conexion = require("../conexion")
module.exports = {
  
	async insertar(usuario, clave) {  // modulo usando async await
        let resultados = await conexion.query(`insert into usuarios
        (usuario, clave)
        values
        (?, ?)`, [usuario, clave]);
        return resultados;
    },
   
}