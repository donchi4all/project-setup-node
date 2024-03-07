import express from 'express';

declare type VerifyTokenRequestType = {
  id: string;
  iat: number,
  exp: number,
  scopes?: Array<string>
}

declare interface ExpressRequest extends express.Request {
  user?: VerifyTokenRequestType;
  file?: any;
}