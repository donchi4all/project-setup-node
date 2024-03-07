export type DatabaseDialectType = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
export interface DbEnvInterface {
  dialect: DatabaseDialectType,
  database: string,
  username: string,
  password: string,
  host: string,
  port: number,
}
