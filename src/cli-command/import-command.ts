import chalk from 'chalk';
import { CliCommandInterface } from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage} from '../utils/common.js';
import DatabaseService from '../common/database-client/database.service.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import {getURI} from '../utils/db.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {OfferServiceInterface} from '../modules/offer/offer-service.interface.js';
import UserService from '../modules/user/user.service.js';
import OfferService from '../modules/offer/offer.service.js';
import {OfferModel} from '../modules/offer/offer.entity.js';
import {UserModel} from '../modules/user/user.entity.js';
import {Offer} from '../types/offer.type.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = 'password';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private salt!: string;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const categories = [];
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    for (const {name} of offer.categories) {
      const existCategory = await this.categoryService.findByCategoryNameOrCreate(name, {name});
      categories.push(existCategory.id);
    }

    await this.offerService.create({
      ...offer,
      categories,
      userId: user.id,
    });
  }

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onComplete(count: number) {
    console.log(`${count} rows imported.`);
  }

  public async execute(filename: string): Promise<void> {
    const fileReader = new TSVFileReader(filename.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch(err) {
      console.log(`Can't read the file: ${chalk.red(getErrorMessage(err))}`);
    }
  }
}
