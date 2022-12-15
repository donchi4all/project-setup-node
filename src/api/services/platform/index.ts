import {
  PlatformCreationRequestType,
  PlatformInterface,
} from '../../models/platform/IPlatform';
import { Platform } from '../../models';
import { PlatformErrorHandler } from '../../../modules/exceptions/PlatformErrorHandler';
import { CommonErrorHandler } from '../../../modules/exceptions';
import { Op } from 'sequelize';
import { IPlatformService } from './IPlatformService';

export { PlatformInterface };
export type { PlatformCreationRequestType };

class PlatformService implements IPlatformService {
  /**
   * Looks up a platform by name
   * @param value
   * @param rejectIfNotFound
   */
  public async findPlatform(
    value: string,
    rejectIfNotFound: boolean = true
  ): Promise<Platform> {
    try {
      const platform = await Platform.findOne({
        where: {
          [Op.or]: [{ slug: value }, { name: value }, { id: value }],
        },
      });

      if (!platform && rejectIfNotFound) {
        return Promise.reject(
          new PlatformErrorHandler(PlatformErrorHandler.DoesNotExist)
        );
      }

      if (platform && !platform.isActive) {
        return Promise.reject(
          new PlatformErrorHandler(PlatformErrorHandler.Forbidden)
        );
      }
      return platform;
    } catch (err) {
      throw new PlatformErrorHandler(CommonErrorHandler.Fatal);
    }
  }

  /**
   * Get a single Platform
   * @param value
   */
  public async getPlatform(value: string): Promise<PlatformInterface> {
    try {
      const platform = await this.findPlatform(value);
      return platform.get();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Create Platform
   * @param platformData
   */
  public async createPlatform(
    platformData: PlatformCreationRequestType
  ): Promise<PlatformInterface> {
    try {
      const existingPlatform = await this.findPlatform(
        platformData.slug,
        false
      );
      if (existingPlatform) {
        throw new PlatformErrorHandler(PlatformErrorHandler.AlreadyExists);
      }
      const platform = await Platform.create({ ...platformData });
      return platform.get();
    } catch (err) {
      throw err;
    }
  }

  /**
   * List all the platform
   */
  public async listPlatform(): Promise<Array<PlatformInterface>> {
    try {
      const platform = await Platform.findAll();
      return platform as Array<PlatformInterface>;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Update Platform
   * @param platformData
   * @param slug
   */
  public async updatePlatform(
    platformData: PlatformCreationRequestType,
    slug: PlatformInterface['slug']
  ): Promise<PlatformInterface> {
    try {
      const existingPlatform = await this.findPlatform(slug);
      if (!existingPlatform) {
        throw new PlatformErrorHandler(PlatformErrorHandler.DoesNotExist);
      }

      if (!existingPlatform.isActive) {
        throw new PlatformErrorHandler(PlatformErrorHandler.Forbidden);
      }
      await existingPlatform.update({
        ...platformData,
      });
      return existingPlatform.get();
    } catch (err) {
      throw err;
    }
  }

  /**
   * Delete  a single Platform
   * @param value
   */
  public async deletePlatform(value: string): Promise<PlatformInterface> {
    try {
      const platform = await this.findPlatform(value);

      await platform.destroy();
      return platform.get();
    } catch (err) {
      throw err;
    }
  }
}

const platformService = new PlatformService();
export default platformService;
