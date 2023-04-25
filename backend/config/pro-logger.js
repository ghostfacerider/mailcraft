import appRoot from 'app-root-path';
import { format, createLogger, transports } from 'winston';

const {
  timestamp, combine, errors, json, prettyPrint,
} = format;

export default function buildProLogger() {
  // define the custom settings for each transport (file, console)
  const options = {
    file: {
      level: 'debug',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      format: combine(
        timestamp(),
        prettyPrint(),
        errors({ stack: true }),
        json(),
      ),
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      format: combine(
        timestamp(),
        prettyPrint(),
        errors({ stack: true }),
        json(),
      ),
    },
  };

  // instantiate a new Winston Logger with the settings defined above
  const logger = createLogger({
    transports: [
      new transports.File(options.file),
      new transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
  });

  // create a stream object with a 'write' function that will be used by `morgan`
  logger.stream = {
    write(message) {
      // use the 'info' log level so the output will be picked up by both
      // transports (file and console)
      logger.info(message);
    },
  };
}
