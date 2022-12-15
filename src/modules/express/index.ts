import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import { Errors } from '../../middleware';
import config from '../../config';

import Secret from '../secret';
import { LoggerDecorator, LoggerInterface } from '../logger';
import { RegisterRoutes, SwaggerJson } from '../routes';

class Express {
  @LoggerDecorator('Server')
  private log: LoggerInterface;
  private express: express.Application;

  constructor () {
    this.express = express();
  }

  private disablePoweredByNodejs (): void {
    this.express.disable('x-powered-by');
  }

  private mountStatics (): void {
    this.express.use('/public', express.static(config.dirs.public));
  }

  private mountBodyParser (): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private mountRequestHandlers (): void {
    //
  }

  private mountErrorHandlers (): void {
    this.express.use(Errors.errorMiddleware.bind(Errors));
  }

  private mountRoutes (): void {
    this.express.use(config.swagger.route, swaggerUi.serve, async (req: express.Request, res: express.Response) => {
      return res.send(
        swaggerUi.generateHTML(SwaggerJson)
      );
    });

    RegisterRoutes(this.express);
  }

  /**
	 * Starts the express server
	 */
  public init (): void {
    try {
      // Mount necessary express settings
      this.disablePoweredByNodejs();
      this.mountStatics();
      this.mountBodyParser();
      this.mountRequestHandlers();
      this.mountRoutes();
      this.mountErrorHandlers();

      // Start the server on the specified port
      this.express.listen(Secret.App.port, () => {
        this.log.info(`Server launched on host: ${Secret.App.host}:${Secret.App.port}`);
      });
    } catch (err) {
      this.log.error(`Server got an error: ${err.message}`);
      throw err;
    }
  }

  public get Server (): express.Application {
    return this.express;
  }
}

export default new Express;