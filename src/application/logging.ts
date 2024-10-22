import winston from 'winston'

export const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf((info) => `${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console({})],
})
