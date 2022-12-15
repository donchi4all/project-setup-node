import {
  Controller,
  Get,
  Route,
  SuccessResponse,
  Post,
  Body,
  Patch,
  Delete, Tags,
} from 'tsoa';

import httpStatuses from '../../httpStatuses';
import { LoggerDecorator, LoggerInterface } from '../../../modules/logger';
import platformService, {
  PlatformInterface,
  PlatformCreationRequestType,
} from '../../services/platform';

@Route('platforms')
@Tags('Platform')
export class PlatformController extends Controller {
  //#region FIELDS
  @LoggerDecorator('Controller.platform')
  private log: LoggerInterface;
  //#endregion

  //#region "/" ENDPOINTS
  @Get()
  @SuccessResponse(httpStatuses.success.code, httpStatuses.success.message)
  public async listPlatform(): Promise<Array<PlatformInterface>> {
    try {
      this.log.info('Route /platform GET all platform');
      return platformService.listPlatform();
    } catch (err) {
      this.log.error(`Route /platform GET with err: ${err}`);
      throw err;
    }
  }

  @Get('{slug}')
  @SuccessResponse(httpStatuses.success.code, httpStatuses.success.message)
  public async getPlatform(slug: string): Promise<PlatformInterface> {
    try {
      this.log.info(`Route /platform/${slug} GET all platform`);
      return platformService.getPlatform(slug);
    } catch (err) {
      this.log.error(`Route /platform/${slug}  GET with err: ${err}`);
      throw err;
    }
  }

  @Post()
  @SuccessResponse(httpStatuses.created.code, httpStatuses.created.message)
  public async addPlatform(
    @Body() data: PlatformCreationRequestType
  ): Promise<PlatformInterface> {
    try {
      this.log.info(
        `Route /platform POST platform data: ${JSON.stringify(data)}`
      );
      return platformService.createPlatform(data);
    } catch (err) {
      this.log.error(`Route /platform POST platform err: ${err}`);
      throw err;
    }
  }

  @Patch('{slug}')
  @SuccessResponse(httpStatuses.created.code, httpStatuses.created.message)
  public async updatePlatform(
    slug: string,
    @Body() data: PlatformCreationRequestType
  ): Promise<PlatformInterface> {
    try {
      this.log.info(
        `Route /platform Patch platform with data: ${JSON.stringify(data)}`
      );
      return platformService.updatePlatform(data, slug);
    } catch (err) {
      this.log.error(`Route /platform Patch with err: ${err}`);
      throw err;
    }
  }

  @Delete('{slug}')
  @SuccessResponse(httpStatuses.created.code, httpStatuses.created.message)
  public async deletePlatform(slug: string): Promise<PlatformInterface> {
    try {
      this.log.info(
        `Route /platform delete platform with slug: ${JSON.stringify(slug)}`
      );
      return await platformService.deletePlatform(slug);
    } catch (err) {
      this.log.error(`Route /platform delete with err: ${err}`);
      throw err;
    }
  }
}
