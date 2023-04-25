import { format } from 'winston';
import appRoot from 'app-root-path';
import chalk from 'chalk';

const {
  timestamp, combine, errors, json, printf, colorize, prettyPrint,
} = format;

const mongo = process.env.MONGO_DB;
const nodeEnv = process.env.NODE_ENV;

const consoleFormat = printf(({
  level, message, timestamp: ts, stack,
}) => `[${level}] ${chalk.yellow(ts)} [${chalk.cyan(nodeEnv.toUpperCase())}] ${stack || message}`);

const fileFormat = printf(({
  level, message, timestamp: ts, stack,
}) => `[${level}] ${ts} [${nodeEnv.toUpperCase()}] ${stack || message}`);

// define the custom settings for each transport (database, file, console)
export default {
  db: {
    level: 'error',
    // mongo database connection link
    db: `${mongo}/logs`,
    options: {
      useUnifiedTopology: true,
    },
    // A collection to save json formatted logs
    collection: 'server_logs',
    format: combine(
      timestamp(),
      errors({ stack: true }),
      json(),
    ),
  },
  file: {
    level: 'debug',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    format: combine(
      prettyPrint(),
      format((info) => {
        // eslint-disable-next-line no-param-reassign
        info.level = info.level.toUpperCase();
        return info;
      })(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      fileFormat,
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: combine(
      prettyPrint(),
      format((info) => {
        // eslint-disable-next-line no-param-reassign
        info.level = info.level.toUpperCase();
        return info;
      })(),
      colorize({
        level: true,
      }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: false }),
      consoleFormat,
    ),
  },
};
