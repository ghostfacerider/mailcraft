const buildProLogger = require("./pro-logger");
const buildDevLogger = requir("./dev-logger");

let logger = null;
if (process.env.NODE_ENV === "development") {
  logger = buildDevLogger();
} else {
  logger = buildProLogger();
}
module.exports = logger;
