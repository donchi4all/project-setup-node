import { ErrorInterface } from './IError';
import { ErrorHandler } from './ErrorHandler';

export class UserErrorHandler extends ErrorHandler {
  constructor(err: ErrorInterface) {
    super(err);
  }

  public static get DoesNotExist(): ErrorInterface {
    return {
      status: 400,
      code: 'NOT_EXIST',
      message: 'User does not exist',
    };
  }

  public static get AlreadyExists(): ErrorInterface {
    return {
      status: 400,
      code: 'ALREADY_EXIST',
      message: 'User already exists',
    };
  }

  public static get IncorrectPassword(): ErrorInterface {
    return {
      status: 422,
      code: 'INCORRECT_PASSWORD_TYPE',
      message: 'Password supplied is incorrect, Please check and try again',
    };
  }

  public static get InvalidPassword(): ErrorInterface {
    /**
     * Minimum 8 characters
     * At least one small and big letter
     * At least one special character
     */
    return {
      status: 422,
      code: 'INVALID_PASSWORD_TYPE',
      message:
        'Incorrect user password type:\n\tMinimum 8 characters.\n\tAt least one small and big letter.\n\tAt least one special character',
    };
  }

  public static get UserBlocked(): ErrorInterface {
    return {
      status: 400,
      code: 'BLOCKED',
      message: 'User has been blocked.',
    };
  }

  public static get FailedToUpdate(): ErrorInterface {
    return {
      status: 500,
      code: 'FAILED_TO_UPDATE',
      message: 'User Failed to update',
    };
  }

  public static LengthMismatch(id: string[] = null): ErrorInterface {
    return {
      status: 500,
      code: 'USER_MISMATCH',
      message: 'We could not find user with these ids ' + id,
    };
  }
}
