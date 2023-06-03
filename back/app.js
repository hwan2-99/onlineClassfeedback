var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//라우터 설정
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/user/index");
const profRouter = require("./routes/prof/index");
const studRouter = require("./routes/stud/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("uploads"));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/prof", profRouter);
app.use("/stud", studRouter);
app.use("/video", express.static("uploads/video"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  next();
});

// catch 404 and forward to error handler
https: app.use(function (req, res, next) {
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
app.listen(3000, () => {
  console.log("서버가 3000 포트에서 실행 중입니다.");
});
module.exports = app;
