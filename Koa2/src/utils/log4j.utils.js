const log4js = require('log4js');

const levels = {
    'trace': log4js.levels.TRACE,
    'debug': log4js.levels.DEBUG,
    'info': log4js.levels.INFO,
    'warn': log4js.levels.WARN,
    'error': log4js.levels.ERROR,
    'fatal': log4js.levels.FATAL
}
//配置
log4js.configure({
    appenders: {
        console: {type: 'console'},
        info: {
            type: 'file',
            filename: 'logs/all-logs.log',
        },
        error: {
            type: 'file',
            filename: 'logs/log',
            pattern:'yyyy-MM-dd.log',
            alwaysIncludePattern: true 
        }
    },
    categories: {
        default: { appenders: ['console'], level: 'debug' },
        info: {
            appenders: ['info','console'],
            level: 'info'
        },
        error: {
            appenders: ['error','console'],
            level: 'error'
        }
    }
})
exports.debug = (content) => {
    let logger = log4js.getLogger('debug')
    logger.level = levels.debug
    logger.debug(content)
}
exports.error = (content) => {
    let logger = log4js.getLogger('error')
    logger.level = levels.error
    logger.error(content)
}
exports.info = (content) => {
    let logger = log4js.getLogger('info')
    logger.level = levels.info
    logger.info(content)
}