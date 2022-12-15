export interface DbEnvInterfaceMaria {
  driver: string,
  host: string,
  port: number,
  database: string,
  user: string,
  password: string,
  multipleStatements?: boolean,
  dateStrings?: boolean,
}

export interface DbEnvInterface {
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
  database: string,
  username: string,
  password: string,
  host: string,
  port: number,
}

export type DatabaseDialectType = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';