// @ts-nocheck

const util = require('util');
const chalk = require('chalk');

const loggerSymbol = Symbol("logger");
const ogWriteFn = process.stdout.write;

const LoggerLevels = Object.freeze({
    DEBUG: Symbol("debug"),
    INFO: Symbol("info"),
    WARN: Symbol("warn"),
    ERROR: Symbol("error")
});

const _private = new WeakMap();
class Logger {

    constructor(appName, context) {
        console.log = _writeFn;
        console.error = _writeFn;
        process.stdout.write = _writeFn;
        process.stderr.write = _writeFn;

        _private.set(this, {

            /** @private { typeof string } _appName **/
            _appName: appName || "",

            /** @private { typeof string } _context **/
            _context: context || "",

            /** @private { typeof LoggerLevels } _level **/
            _level: LoggerLevels.DEBUG,

            /** @private { Function } _shouldLog **/
            _shouldLog: (presentLevel, permission) => {
                switch(presentLevel) {
                    case LoggerLevels.DEBUG:
                        return true;
                    case LoggerLevels.WARN:
                        return permission !== LoggerLevels.DEBUG;
                    case LoggerLevels.ERROR:
                        return permission !== LoggerLevels.DEBUG && permission !== LoggerLevels.WARN;
                }
            }
        });
    }

    get level() {
        return _private.get(this)._level;
    }

    set level(_level) {
        if (Object.values(LoggerLevels).indexOf(_level) !== -1) {
            _private.get(this)._level = _level;
        }
    }

    setContext(context) {
        return new Logger(_private.get(this)._appName, context);
    }

    createHeader(level) {
        const context = _private.get(this)._context;
        const appName = _private.get(this)._appName;

        return !!context ?
            `[ ${appName} (${context}) - ${level} ]:` :
            `[ ${appName} - ${level} ]:`;
    }

    debug(string, encoding?, fd?) {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.DEBUG)) {
            _log(chalk.green.bold(this.createHeader('DEBUG')), string, encoding, fd);
        }
    }

    info(string, encoding?, fd?) {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.INFO)) {
            _log(chalk.blue.bold(this.createHeader('INFO')), string, encoding, fd);
        }
    }

    warn(string, encoding?, fd?) {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.WARN)) {
            _log(chalk.yellow.bold(this.createHeader('WARNING')), string, encoding, fd);
        }
    }

    error(string, encoding?, fd?) {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.ERROR)) {
            _log(chalk.red.bold(this.createHeader('ERROR')), string, encoding, fd);
        }
    }

    external(string, encoding?, fd?) {
        if (_private.get(this)._shouldLog(this.level, LoggerLevels.ERROR)) {
            _log(chalk.magenta.bold(this.createHeader('EXTERNAL')), string, encoding, fd);
        }
    }
}

function _log(header, string, encoding?, fd?) {
    let _date = new Date();

    if (!string || string.length === 0) {
        process.stdout.write('\n', encoding, fd, loggerSymbol);
    } else {
        process.stdout.write(`${chalk.yellow.bold(`[${_date.toLocaleString()}]`)}${header} \n ${util.format.apply(this, [string])}\n`, encoding, fd, loggerSymbol);
    }
}

function _writeFn (string?, encoding?, fd?, sym?) {
    if (sym === loggerSymbol) {
        ogWriteFn.call(process.stdout, string, encoding, fd, sym);
    } else {
        logger.external(string, encoding, fd);
    }
}

export { Logger, LoggerLevels as levels };
