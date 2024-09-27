import { pinoHttp } from 'pino-http';

export const httpLogger = pinoHttp({
  name: 'HTTPLoggerService',
  base: null,
  autoLogging: false,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn';
    } else if (res.statusCode >= 500 || err) {
      return 'error';
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent';
    }
    return 'info';
  },
  genReqId: () => null,
  transport: {
    target: 'pino/file',
    options: { destination: './log.txt', ignore: 'hostname' },
  },
});
