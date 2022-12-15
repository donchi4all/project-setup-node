import { 
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt, 
  AllowNull
} from 'sequelize-typescript';
import { PlatformInterface } from './IPlatform';
import { StringsFormating as Str} from '../../../utils';

@Table({
  tableName: 'platform',
  createdAt: false,
  updatedAt: false,
})
export class Platform extends Model<PlatformInterface> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: PlatformInterface['id'];

  @Column(DataType.STRING)
  name: PlatformInterface['name'];

  @Column({
    type: DataType.STRING,
        set (value: string): void {
      this.setDataValue('slug', Str.toSlugCase(value));
    }
  })
  slug: PlatformInterface['slug'];

  @AllowNull
  @Column(DataType.STRING)
  description: PlatformInterface['description'];

  @Column(DataType.BOOLEAN)
  isActive?: PlatformInterface['isActive'];

  @CreatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: PlatformInterface['createdAt'];
  
  @UpdatedAt
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: PlatformInterface['updatedAt'];
}
