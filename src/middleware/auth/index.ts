// import { AuthErrorHandler } from './../../modules/exceptions/AuthErrorHandler';
// import express from 'express';
// import { VerifyTokenRequestType } from 'request';

// import authService from '../../api/services/auth';

// export const expressAuthentication = async (
//   request: express.Request,
//   securityName: string,
//   scopes?: string[]
// ): Promise<VerifyTokenRequestType> => {
//   if (securityName === 'accessToken') {
//     const token = request.headers.authorization;
//     try {
//       const decoded = await authService.verifyAccessToken(token);
//       // Check if JWT contains all required scopes
//       for (const scope of scopes) {
//         if (!decoded.scopes.includes(scope)) {
//           throw new AuthErrorHandler(AuthErrorHandler.AccessDenied);
//         }
//       }

//       return Promise.resolve(decoded);
//     } catch (err) {
//       return Promise.reject(err);
//     }
//   }
// };
