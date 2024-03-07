import { ErrorInterface } from './IError';
import { ErrorHandler } from './ErrorHandler';

export class ValidationErrorHandler extends ErrorHandler {
  constructor (err: ErrorInterface) {
    super (err);
  }

  public static get RequestValidationFailed () : ErrorInterface {
    return {
      status: 403,
      code: 'VALIDATION_ERROR',
      message: 'Request validation failed. Please crosscheck input fields',
    };
  }
}
