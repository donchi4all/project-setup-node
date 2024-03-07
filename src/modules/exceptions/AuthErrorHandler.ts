import { ErrorInterface } from './IError';
import { ErrorHandler } from './ErrorHandler';

export class AuthErrorHandler extends ErrorHandler {
  constructor (err: ErrorInterface) {
    super (err);
  }
  
  public static get InvalidCredentials () : ErrorInterface {
    return {
      status: 401,
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid credentials',
    };
  }  
  
  public static get InvalidResetToken () : ErrorInterface {
    return {
      status: 401,
      code: 'INVALID_RESET_TOKEN',
      message: 'Invalid reset token',
    };
  }  
  
  public static get PasswordMismatch () : ErrorInterface {
    return {
      status: 422,
      code: 'PASSWORD_MISMATCH',
      message: 'Password mismatch',
    };
  }  
  
  public static get PinMismatch () : ErrorInterface {
    return {
      status: 422,
      code: 'PIN_MISMATCH',
      message: 'Pin mismatch',
    };
  }  
  
  public static get InvalidPassword () : ErrorInterface {
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

  public static get InvalidPin () : ErrorInterface {
    /**
     * 4 numeric characters
     */
    return {
      status: 422,
      code: 'INVALID_PIN',
      message:
        'Supplied PIN is incorrect. Pin must be 4 numeric characters',
    };
  }

  public static get TokenExprired () : ErrorInterface {
    return {
      status: 401,
      code: 'TOKEN_EXPIRED',
      message: 'Your session has expired please sign-in again',
    };
  }  
  
  public static get RefreshTokenNotFound () : ErrorInterface {
    return {
      status: 401,
      code: 'REFRESH_TOKEN_NOT_FOUND',
      message: 'No refresh token found in headers',
    };
  }  
  
  public static get ExpiredResetToken () : ErrorInterface {
    return {
      status: 401,
      code: 'EXPIRED_TOKEN',
      message: 'Password reset token has expired',
    };
  }  
  
  public static get AccessDenied () : ErrorInterface {
    return {
      status: 403,
      code: 'ACCESS_DENIED',
      message: 'You do not have the permission to perform this action',
    };
  }  
  
  public static get UserNotActive () : ErrorInterface {
    return {
      status: 403,
      code: 'NOT_ACTIVE',
      message: 'You are not active. Please contact the administrator',
    };
  }  

  
}
