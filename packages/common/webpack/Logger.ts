import type { Compilation } from 'webpack';

export type LoggerInstance = Compilation['logger'] | typeof console;

export default class Logger {
  private static loggerInstance: LoggerInstance = console;

  static getLogger(): LoggerInstance {
    return this.loggerInstance;
  }

  static setLogger(logger: Compilation['logger']): LoggerInstance {
    this.loggerInstance = logger || console;
    return logger;
  }
}
