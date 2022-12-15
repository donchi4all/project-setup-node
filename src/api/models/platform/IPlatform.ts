export interface PlatformInterface {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PlatformCreationType = Pick<
  PlatformInterface,
  'name' | 'slug' | 'description' | 'isActive'
>;

export type PlatformCreationRequestType = PlatformCreationType;
