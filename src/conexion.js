const mysql = require("mysql");
const { promisify } = require("util");
const credencialesDb = require("./config/credenciales");
const pool = mysql.createPool(credencialesDb);
pool.getConnection((err, connection) => {
  if (err) return console.log("Error en la conexion con la db");
  connection.release();
  console.log("Base de datos conectada");
  return;
});

pool.query = promisify(pool.query);
module.exports = pool;
