import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import * as url from 'node:url';

import logger from './config/index.js';
import router from './routes/index.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// loading env variables
dotenv.config();

// conect to our monodb
logger.info(`MONGO_DB: ${process.env.MONGO_DB}`);
mongoose.connect(process.env.MONGO_DB);

const app = express();
const sessionSettings = {
  secret: (process.env.SESSION_SECRET),
  resave: false,
  saveUninitialized: false,
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors()); // allow access from anywhere
app.use(morgan('combined', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session(sessionSettings));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', router);
app.use(bodyParser.json());
// catch 404 and forward to error handler
app.use((req, res, next) => {
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

export default app;
