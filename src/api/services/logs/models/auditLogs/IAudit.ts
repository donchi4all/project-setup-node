import { Readable } from 'stream';
export interface IAuditInterface {
  id?: string;
  tenantId?: string;
  userId?: string;
  type: AuditTypeEnum;
  model: ModelEnum;
  request?: any;
  response?: JSON | string | Buffer | Readable;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  statusCode?: string | number;
  requestId?: string;
  device?: string;
  ipAddress?: string;
  method?: string;
  headers?: { [key: string]: any };
  service?: string;
}

export type UpdateCrudLog = {
  requestId?: string;
  type?: AuditTypeEnum;
  response?: JSON | string | Buffer | Readable;
};

export enum AuditTypeEnum {
  success = 'success',
  error = 'error',
  pending = 'pending',
}

export enum ModelEnum {
  api = 'api',
  crud = 'crud',
  user = 'user',
  account = 'account',
  bank = 'bank',
  expense = 'expense',
  budget = 'budget',
  currency = 'currency',
  workflow = 'workflow',
  vendor = 'vendor',
  cronjob = 'cronjob',
}

export type AuditCreationParams = Pick<
  IAuditInterface,
  | 'id'
  | 'tenantId'
  | 'userId'
  | 'type'
  | 'model'
  | 'request'
  | 'response'
  | 'url'
  | 'method'
  | 'headers'
  | 'device'
  | 'ipAddress'
  | 'service'
  | 'requestId'
>;

export type AuditApiCreationParams = Pick<
  IAuditInterface,
  | 'id'
  | 'tenantId'
  | 'userId'
  | 'type'
  | 'request'
  | 'response'
  | 'url'
  | 'statusCode'
  | 'method'
  | 'headers'
  | 'service'
>;
