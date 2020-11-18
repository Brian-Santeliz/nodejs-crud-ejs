const mysql = require("mysql");
const { promisify } = require("util");
require("dotenv").config();
const credencialesDb = {
  host: process.env.HOST,
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  database: process.env.NOMBRE_BD,
};
const pool = mysql.createPool(credencialesDb);
pool.getConnection((err, connection) => {
  if (err) return console.log("Error en la conexion con la db");
  connection.release();
  console.log("Base de datos conectada");
  return;
});

pool.query = promisify(pool.query);
module.exports = pool;
