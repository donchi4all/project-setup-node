import {
  Table,
  DataType,
  Column,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  AllowNull,
  Model,
} from 'sequelize-typescript';
import { AuditTypeEnum, IAuditInterface, ModelEnum } from './IAudit';

@Table({
  tableName: 'auditLogs',
})
export class AuditLogs extends Model<IAuditInterface> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @AllowNull(true)
  @Column(DataType.UUID)
  tenantId!: string;

  @AllowNull(true)
  @Column(DataType.UUID)
  userId!: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(AuditTypeEnum)))
  type: AuditTypeEnum;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(ModelEnum)))
  model: ModelEnum;

  @AllowNull(true)
  @Column(DataType.JSON)
  request!: JSON;

  @AllowNull(true)
  @Column(DataType.STRING)
  url!: string;

  @Column(DataType.STRING)
  device!: string;

  @Column(DataType.STRING)
  requestId!: string;

  @Column(DataType.STRING)
  ipAddress!: string;

  @Column(DataType.STRING)
  method!: string;

  @Column(DataType.STRING)
  service!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  statusCode!: string;

  @AllowNull(true)
  @Column(DataType.JSON)
  response!: JSON;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
