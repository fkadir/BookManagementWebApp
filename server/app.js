var express = require("express");
require("dotenv").config();
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");

//routers
var allBooksRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var myBooksRouter = require("./routes/myBooks");
var pwRecoveryRouter = require("./routes/passwordRecovery");

var app = express();

// view engine setup
app.set("view engine", "jade");

// middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

//routes
app.use("/books", allBooksRouter);
app.use("/users", usersRouter);
app.use("/mybooks", myBooksRouter);
app.use("/pwrecovery", pwRecoveryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).send("error");
  // res.render("error");
});

app.listen(9000);

module.exports = app;
