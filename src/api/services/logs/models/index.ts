import { Sequelize } from 'sequelize-typescript';

import Secret from '../../../../modules/secret';
import { AuditLogs } from './auditLogs';
import { LoggerDecorator, LoggerInterface } from '../../../../modules/logger';

export const Models = {
  AuditLogs,
};

class Database {
  @LoggerDecorator('Logs Database')
  private log: LoggerInterface;
  private sequelize: Sequelize;

  public init(): void {
    this.sequelize = new Sequelize({
      ...Secret.DbLogs,
      pool: { max: 5 },
      models: Object.values(Models),
      logging: false,
    });
  }

  public getSequelize() {
    if (!this.sequelize) {
      this.init();
    }
    this.sequelize.sync();
    return this.sequelize;
  }
}

const database = new Database();

export default database;
export const sequelize = database.getSequelize();
