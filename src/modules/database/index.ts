import { Repository, Sequelize, Model } from 'sequelize-typescript';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration';

import * as Models from '../../api/models';
import Secret from '../secret';
import { LoggerDecorator, LoggerInterface } from '../logger';
import config from '../../config';

export class Database {
  @LoggerDecorator('Database')
  private log: LoggerInterface;
  private sequelize: Sequelize;

  public init (): void {
    this.sequelize = new Sequelize({
      ...Secret.Db,
      pool: { max: 1 },
      models: Object.values(Models),
      logging: false,
    });
    this.log.info('Sequelize ORM with mariaDb has been created successfully.');
  }

  public async makeMigration (
    migrationName: string,
    models: Array<Repository<Model<unknown, unknown>>> = []
  ): Promise<{ msg: string }> {
    try {
      let customSequalize: Sequelize = null;
      if (models.length) {
        customSequalize = new Sequelize({
          ...Secret.Db,
          pool: { max: 1 },
          models,
          logging: (sql: string, timing?: number): void => {
            this.log.info(`${timing}: ${sql}`);
          },
        });
      }

      const migration = await SequelizeTypescriptMigration.makeMigration(
        customSequalize || this.sequelize,
        {
          outDir: Secret.getPath(config.dirs.migrations),
          migrationName,
        },
      );

      return migration;
    } catch (err) {
      this.log.error(`Sequelize Migration Error "${migrationName}": ${err}`);
      throw err;
    }
  }

  public async rawQuery (queryString: string): Promise<[unknown[], unknown]> {
    try {
      return this.sequelize.query(queryString);
    } catch (err) {
      this.log.error('Fail raw query', err);
    }
  }
}

export default new Database;