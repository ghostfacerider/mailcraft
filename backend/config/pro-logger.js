import { createLogger, transports } from 'winston';

import format from './format.js';

export default function buildProLogger() {
  // instantiate a new Winston Logger with the settings defined above
  const logger = createLogger({
    transports: [
      new transports.MongoDB(format.db),
      new transports.Console(format.console),
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
