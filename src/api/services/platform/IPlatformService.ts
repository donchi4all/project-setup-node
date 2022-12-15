import {
  PlatformCreationRequestType,
  PlatformInterface,
} from '../../models/platform/IPlatform';

export interface IPlatformService {
  /**
   * Create Platform
   * @param platformData
   */
  createPlatform(
    platformData: PlatformCreationRequestType
  ): Promise<PlatformInterface>;

  /**
   * Update Platform
   * @param platformData
   * @param slug
   */
  updatePlatform(
    platformData: PlatformCreationRequestType,
    slug: PlatformInterface['slug']
  ): Promise<PlatformInterface>;

  /**
   * List all the platform
   */
  listPlatform(): Promise<Array<PlatformInterface>>;

  /**
   * Get a single Platform
   * @param value
   */
  getPlatform(value: string): Promise<PlatformInterface>;

  /**
   * Delete  a single Platform
   * @param value
   */
  deletePlatform(value: string): Promise<PlatformInterface>;
}
