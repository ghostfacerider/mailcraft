var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");

var winston = require("./config/index");

console.log(winston);

//loading env variables
require("dotenv").config();

//conect to our monodb
console.log(`MONGO_DB: ${process.env.MONGO_DB}`);
mongoose.connect(process.env.MONGO_DB);

//import our rounters
var indexRouter = require("./routes/api/index");
var apiRouter = require("./routes/api"); //api = api folder
const { log } = require("console");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors()); // allow access from anywhere
app.use(morgan("combined", { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build")));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/api", apiRouter);

app.use(bodyParser.json());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};

//     // include winston logging
//     winston.error(
//         `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
//             req.method
//         } - ${req.ip}`
//     );

//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });

module.exports = app;
