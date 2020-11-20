require("dotenv").config();
const credencialesDb = {
  host: process.env.HOST,
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  database: process.env.NOMBRE_BD,
};
module.exports = credencialesDb;
