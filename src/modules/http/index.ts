import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';

import LogService from '../../../src/api/services/logs';
import { AuditTypeEnum } from '../../../src/api/services/logs/models/auditLogs/IAudit';
import appConfig from '../../config';
import { LoggerDecorator, LoggerInterface } from '../logger';
import { ErrorHandler, CommonErrorHandler } from '../exceptions';
import secret from '../secret';
import _ from 'lodash';

// Http response type
export type HttpResponseType = Promise<any>;

export class Http {
    @LoggerDecorator('Http')
    private log: LoggerInterface;

    private readonly axiosInstance: AxiosInstance;
    private retryEnabled: boolean; // Global retry flag

    constructor(
        baseUrl: string,
        retryEnabled: boolean = true,
        customConfig: AxiosRequestConfig = {}
    ) {
        this.retryEnabled = retryEnabled;

        try {
            // Combine custom Axios config with defaults
            const defaultConfig: AxiosRequestConfig = {
                baseURL: baseUrl,
                timeout: appConfig.got.timeout,
                // headers: baseUrl !== secret.Urls.cba_bank
                //     ? { 'Content-Type': 'application/json' }
                //     : {},
            };

            this.axiosInstance = axios.create({
                ...defaultConfig,
                ...customConfig,
            });

            // Retry logic interceptor
            this.axiosInstance.interceptors.response.use(
                (response) => response,
                async (error: AxiosError) => {
                    const shouldRetry =
                        this.retryEnabled &&
                        error.config &&
                        this.isRetryable(error);

                    if (shouldRetry) {
                        this.log.warn(`Retrying request to ${error.config.url} after failure.`);
                        return this.axiosInstance.request(error.config);
                    }

                    return Promise.reject(error);
                }
            );
        } catch (err) {
            this.log.error(`${baseUrl} initialization error: `, err);
            throw err;
        }
    }

    // Enable retries globally
    public enableRetry(): void {
        this.retryEnabled = true;
        this.log.info('Retry has been enabled.');
    }

    // Disable retries globally
    public disableRetry(): void {
        this.retryEnabled = false;
        this.log.info('Retry has been disabled.');
    }

    private isRetryable(error: AxiosError): boolean {
        const retryableStatusCodes: number[] = []
        // [408, 413, 429, 500, 502, 503, 504]; //TODO:// as core backing the code we need to get before retryable
        return (
            error.response?.status &&
            retryableStatusCodes.includes(error.response.status)
        );
    }

    private createDefaultException(
        url: string,
        err: AxiosError,
        request: AxiosRequestConfig = {},
        service: string,
        method: string = ''
    ): ErrorHandler {
        const statusCode = err.response?.status || 500;
        let message = err.message || 'An error occurred';
        let code = CommonErrorHandler.Fatal.code;
        // Safely access error response data
        const errData = err.response?.data;

        if (typeof errData === 'object' && errData !== null) {
            const data = errData as {
                data?: { Reason?: string };
                Exception?: string;
                message?: string;
                error_description?: string;
            };

            // Attempt to extract meaningful error messages
            message =
                data?.data?.Reason || // Nested reason
                data?.Exception || // General exception
                data?.message || // Generic message
                data?.error_description || // Detailed error description
                message; // Default fallback
        }


        // Log error to audit
        LogService.logApi({
            request,
            response: message,
            type: AuditTypeEnum.success,
            url,
            service,
            method,
            headers: request.headers,
            statusCode
        });

        return new ErrorHandler({
            code,
            message,
            status: statusCode,
        });
    }

    private logResponse(
        request: AxiosRequestConfig = {},
        response: AxiosResponse,
        service: string
    ) {
        const { data, config, status } = response;

        LogService.logApi({
            request,
            response: data,
            type: AuditTypeEnum.success,
            url: config.url!,
            service,
            method: config.method?.toUpperCase() || 'UNKNOWN',
            headers: request.headers,
            statusCode: status
        });

        return data;
    }

    public async get(
        url: string = '',
        options: AxiosRequestConfig & { body?: any } = {},
        service: string
    ): HttpResponseType {
        try {
            const response = await this.axiosInstance.get(url, options);
            return this.logResponse(options, response, service);
        } catch (err) {
            this.log.error(`GET ${url} error: ${err}`);
            throw this.createDefaultException(url, err as AxiosError, options, service, 'GET');
        }
    }

    public async post(
        url: string = '',
        options: AxiosRequestConfig & { body?: any } = {},
        service: string
    ): HttpResponseType {
        try {
            const response = await this.axiosInstance.post(
                url,
                options.body || {}, // Send body payload
                options
            );
            return this.logResponse(options, response, service);
        } catch (err) {
            this.log.error(`POST ${url} error: ${err}`);
            throw this.createDefaultException(url, err as AxiosError, options, service, 'POST');
        }
    }

    public async patch(
        url: string = '',
        options: AxiosRequestConfig & { body?: any } = {},
        service: string
    ): HttpResponseType {
        try {
            const response = await this.axiosInstance.patch(
                url,
                options.body || {},
                options
            );
            return this.logResponse(options, response, service);
        } catch (err) {
            this.log.error(`PATCH ${url} error: ${err}`);
            throw this.createDefaultException(url, err as AxiosError, options, service, 'PATCH');
        }
    }

    public async delete(
        url: string = '',
        options: AxiosRequestConfig & { body?: any } = {},
        service: string
    ): HttpResponseType {
        try {
            const response = await this.axiosInstance.delete(url, {
                ...options,
                data: options.body, // Send body in delete requests
            });
            return this.logResponse(options, response, service);
        } catch (err) {
            this.log.error(`DELETE ${url} error: ${err}`);
            throw this.createDefaultException(url, err as AxiosError, options, service, 'DELETE');
        }
    }
}
