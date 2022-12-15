import express from 'express';

import { ErrorInterface } from '../../modules/exceptions/IError';

class Errors {
  public errorMiddleware (
    err: ErrorInterface,
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: express.NextFunction): void {
      const { status } = err;
      res.status(status || 500).json({
        ...err,
        message: err.message,
        status: undefined,
      });
  }
}

export default new Errors;