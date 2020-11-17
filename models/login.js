const conexion = require("../conexion");
module.exports = {
  buscarusuario(usuario, clave) {
    return new Promise((resolve, reject) => {
      conexion.query(
        `select usuario, clave from usuarios where usuario = ? AND clave = ?`,
        [usuario, clave],
        (err, resultados) => {
          if (err) reject(err);
          else resolve(resultados[0]);
        }
      );
    });
  },
};
