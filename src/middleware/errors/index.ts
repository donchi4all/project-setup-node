import express from 'express';
import secret from '../../modules/secret';

import { 
  CommonErrorHandler, 
  ValidationErrorHandler, 
  DatabaseErrorHandler 
} from '../../modules/exceptions';
import { ValidateError } from '@tsoa/runtime';
import { ErrorInterface } from '../../modules/exceptions/IError';

class Errors {
  public errorMiddleware(
    err: ErrorInterface,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction): void {
      try{
        if(err instanceof ValidateError){
          // handle tsoa validation error
          throw new ValidationErrorHandler({
            ...ValidationErrorHandler.RequestValidationFailed,
            errors: err.fields
          })
        }

        throw err;
      }
      catch(err){
        const { status, message } = err;  
        res.status(status || 500).json({
          ...(secret.App.env !== 'production' && err), // dont show sensitive errors in production
          status: undefined,
          name: err.name || this.constructor.name,
          code: err.code || CommonErrorHandler.Fatal.code,
          message: message || CommonErrorHandler.Fatal.message,
          errors: err.errors
        });
      }
  }
}

export default new Errors;
