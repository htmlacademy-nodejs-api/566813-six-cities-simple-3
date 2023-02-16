import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import { LoggerInterface } from '../common/logger/logger.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';
  private logger: LoggerInterface;

  constructor() {
    this.logger = new ConsoleLoggerService();
  }

  public async execute(): Promise<void> {
    this.logger.info(`
    ${chalk.green.bold.underline ('Программа для подготовки данных для REST API сервера.')}  

    ${chalk.italic('Пример: cli.js --<command> [--arguments]')} 
        
    ${chalk.bgGreen.bold('Команды:')} 
        
        ${chalk.bold.greenBright('--version:')}                   ${chalk.whiteBright.italic('# выводит номер версии')}
        ${chalk.bold.greenBright('--help:')}                      ${chalk.whiteBright.italic('# печатает этот текст')}
        ${chalk.bold.greenBright('--import <path>:')}             ${chalk.whiteBright.italic('# импортирует данные из TSV')}
        ${chalk.bold.greenBright('--generate <n> <path> <url>')}  ${chalk.whiteBright.italic('# генерирует произвольное количество тестовых данных')}
        `);
  }
}
