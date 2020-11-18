const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

//**************************************************
const session = require("express-session");
//**************************************************
const indexRouter = require("./routes/index");
const carrosRouter = require("./routes/carros");
const clientesRouter = require("./routes/clientes");
const fabricantesRouter = require("./routes/fabricantes");
const loginRouter = require("./routes/login");
const registrarseRouter = require("./routes/registrarse");
const logoutRouter = require("./routes/logout");

const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
//*************************************************
// Configuración de las vistas
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PUERTO || 4040);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/carros", carrosRouter);
app.use("/clientes", clientesRouter);
app.use("/fabricantes", fabricantesRouter);
app.use("/login", loginRouter);
app.use("/registrarse", registrarseRouter);
app.use("/logout", logoutRouter);
// manipulacion de errores 404
app.use(function (req, res, next) {
  next(createError(404));
});
// Manejo de errores
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // renderizar la página de error
  res.status(err.status || 500);
  res.render("error");
});
app.listen(app.get("port"), () =>
  console.log(`Servidor en el puerto: ${app.get("port")}`)
);
