import ac from 'accesscontrol';

import * as Models from '../../api/models';
import { LoggerDecorator, LoggerInterface } from '../logger';

class AccessControl {
  @LoggerDecorator('AccessControl')
  private log: LoggerInterface;
  private accessControl: ac.AccessControl;

  public async init (): Promise<void> { }

  public checkAccess (role: string): ac.Query {
    return this.accessControl.can(role);
  }
}

export default new AccessControl;