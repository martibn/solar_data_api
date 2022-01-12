"use strict";

import {Logger, levels} from "./logger";

declare global {
    var logger: Logger;
    var LoggerLevels: typeof levels
}

global.logger = new Logger("Solar data", "API");
global.LoggerLevels = levels;

process.on('uncaughtException', (err) => logger.error(err));

module.exports = require("./src/main");
