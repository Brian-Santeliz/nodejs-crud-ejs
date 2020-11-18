const mysql = require("mysql");
const { promisify } = require("util");
require("dotenv").config();
const conexion = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  database: process.env.NOMBRE_BD,
});
conexion.getConnection((err, done) => {
  if (err) return console.log("Error en la conexion con la db");
  done.release();
  console.log("Base de datos conectada");
});

conexion.query = promisify(conexion.query);
module.exports = conexion;
