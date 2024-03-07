import { ErrorInterface } from './IError';
import { ErrorHandler } from './ErrorHandler';

export class DatabaseErrorHandler extends ErrorHandler {
  constructor (err: ErrorInterface) {
    super (err);
  }
}
