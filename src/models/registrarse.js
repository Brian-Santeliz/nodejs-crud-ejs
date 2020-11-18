const conexion = require("../conexion");
const bcrypt = require("bcrypt");
module.exports = {
  insertar(usuario, clave) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) console.log("error salt");
      bcrypt.hash(salt, clave, function (erro, clave) {
        if (error) console.log("error hash");
        console.log(clave);
        let resultados = conexion.query(
          `insert into usuarios
            (usuario, clave)
            values
            (?, ?)`,
          [usuario, clave]
        );
        return resultados;
      });
    });
  },
};
