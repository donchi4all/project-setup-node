import Secret from '../../../modules/secret';
import { Models } from './models';
import { Readable } from 'stream';
import { Op } from 'sequelize';
import {
  AuditApiCreationParams,
  AuditCreationParams,
  ModelEnum,
  UpdateCrudLog,
} from './models/auditLogs/IAudit';

export default class LogService {
  static enableAPILog: boolean = Secret.Audit.enableAPILog;
  static enableCrudLog: boolean = Secret.Audit.enableCrudLog;

  static async log(data: AuditCreationParams): Promise<any> {
    if (!this.enableCrudLog) return;
    return Models.AuditLogs.create({
      ...data,
    });
  }

  static async updateLog(data: UpdateCrudLog): Promise<any> {
    if (!this.enableCrudLog) return;
    return Models.AuditLogs.update(
      { response: data.response, type: data.type },
      { where: { requestId: data.requestId } },
    );
  }

  static async logApi(data: AuditApiCreationParams): Promise<any> {
    if (!this.enableAPILog) return;
    return Models.AuditLogs.create({
      ...data,
      model: ModelEnum.api,
      request: this.filterSecretData(data.request),
    });
  }

  static maskSecretData(data: string, length: number = 1): string {
    return data
      ? data
          ?.split('')
          ?.fill('*', length, data.length - 1)
          .join('')
      : null;
  }

  static filterSecretData(request: string | Buffer | { [key: string]: any } | Readable) {
    const requestObject = JSON.parse(JSON.stringify(request));
    let body = requestObject?.body ? JSON.parse(requestObject?.body) : null;
    if (!body) {
      return;
    }

    let password = body?.password;
    let pin = body?.pin;

    password = password ? this.maskSecretData(password) : undefined;
    pin = pin ? this.maskSecretData(pin) : undefined;

    return (body = { ...body, password, pin });
  }
}
