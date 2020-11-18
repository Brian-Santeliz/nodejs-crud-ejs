const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const carrosRouter = require("./routes/carros");
const clientesRouter = require("./routes/clientes");
const fabricantesRouter = require("./routes/fabricantes");
const loginRouter = require("./routes/login");
const registrarseRouter = require("./routes/registrarse");
const logoutRouter = require("./routes/logout");
const Verificar = require("./middlewares/verificarAuth");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", process.env.PUERTO || 4040);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/carros", Verificar.auth, carrosRouter);
app.use("/clientes", Verificar.auth, clientesRouter);
app.use("/fabricantes", Verificar.auth, fabricantesRouter);
app.use("/login", loginRouter);
app.use("/registrarse", registrarseRouter);
app.use("/logout", logoutRouter);
app.use(function (req, res, next) {
  next(res.redirect("/login"));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});
app.listen(app.get("port"), () =>
  console.log(`Servidor en el puerto: ${app.get("port")}`)
);