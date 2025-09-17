import { IPagination } from './../../utils/queries/interface/index';

export enum ResponseTypeEnum {
  SUCCESS = 'success',
  FAILED = 'failed',
}

export class SuccessResponseModel<T> {
  status?: ResponseTypeEnum;
  data: T;
  message?: string;
  meta?: IPagination;

  constructor(
    data: T,
    message?: string,
    status: ResponseTypeEnum = ResponseTypeEnum.SUCCESS,
    meta?: IPagination,
  ) {
    this.status = status;
    this.data = data;
    this.message = message;
    this.meta = meta;
  }
}
