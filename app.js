var createError = require("http-errors");
var express = require("express");
var path = require("path");
var config = require("./config");
var { userTypes } = require("./const");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const { mongo } = require("./dao");
var logger = require("morgan");
const { auth } = require("./controllers");
var authenticate = require("./routes/auth");
var routes = require("./routes");
var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use("/api/auth", authenticate);
app.use("/api", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongo
  .connect()
  .then(async (result) => {
    console.log(result);
    console.log("db connected starting routes");

    //bootstarp with 2 admin accounts
    const adminExists = await auth.checkAdmins();
    console.log(adminExists)
    if (!adminExists) {
      // auth.createAdmin([
      //   {
      //     fName: "admin",
      //     userName: "admin1",
      //     password: "Password1",
      //     type: userTypes.ADMIN,
      //   },
      //   {
      //     userName: "admin2",
      //     password: "Password2",
      //     fName: "admin",
      //     type: userTypes.ADMIN,
      //   },
      // ]);
    }
  })
  .catch((err) => {
    console.log(`Failed to start the app: ${err.message}`);
  });

app.listen(config.port, () => {
  console.log(`App is running on port: ${config.port}`);
});

module.exports = app;
