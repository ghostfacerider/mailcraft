import buildProLogger from './pro-logger.js';
import buildDevLogger from './dev-logger.js';

// eslint-disable-next-line import/no-mutable-exports
let logger = null;

if (process.env.NODE_ENV === 'development') {
  logger = buildDevLogger();
} else {
  logger = buildProLogger();
}

export default logger;
