import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import * as Sentry from '@sentry/node';

import { Errors } from '../../middleware';
import config from '../../config';
// import CronJob from '../../config/cronjob';
import Secret from '../secret';
import { LoggerDecorator, LoggerInterface } from '../logger';
import { RegisterRoutes, SwaggerJson } from '../routes';

class Express {
  @LoggerDecorator('Server')
  private log: LoggerInterface;
  private express: express.Application;

  constructor() {
    this.express = express();
  }

  private disablePoweredByNodejs(): void {
    this.express.disable('x-powered-by');
  }

  private mountStatics(): void {
    this.express.use('/core/public', express.static(config.dirs.public));
  }

  private mountBodyParser(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private mountCookieParserAndCors(): void {
    const options: cors.CorsOptions = config.corsOptions;
    this.express.use(cors(options));
    this.express.use(express.json());
    this.express.use(cookieParser());
  }

  private mountErrorHandlers(): void {
    this.express.use(Errors.errorMiddleware.bind(Errors));
  }

  private mountRoutes(): void {
    this.express.get('/api/ips', (request, response) => {
      const clientIP = request.headers['x-forwarded-for'] || request.connection.remoteAddress;

      response.send(`Client IP: ${clientIP}  --- ${request.ip}`);
    });

    // Swagger UI route (avoid returning Promise<Response>)
    this.express.use(
      config.swagger.route,
      swaggerUi.serve,
      async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
          const html = swaggerUi.generateHTML(SwaggerJson);
          res.send(html); // Don't return here, ensure Promise<void>
        } catch (error) {
          next(error);
        }
      },
    );

    RegisterRoutes(this.express);
  }

  /**
   * Starts the express server
   */
  public init(): void {
    try {
      // Mount necessary express settings
      this.disablePoweredByNodejs();
      this.mountStatics();
      this.mountBodyParser();
      this.mountCookieParserAndCors();
      this.mountRoutes();
      this.mountErrorHandlers();

      // Start the server on the specified port
      this.express.listen(Secret.App.port, () => {
        this.log.info(`Server launched on host: ${Secret.App.host}:${Secret.App.port}`);
        this.log.info(`Access Swagger UI at: ${Secret.App.host}:${Secret.App.port}${config.swagger.route}`);
      });
    } catch (err) {
      this.log.error(`Server got an error: ${err.message}`);
      throw err;
    }
  }

  public get Server(): express.Application {
    return this.express;
  }
}

export default new Express();
