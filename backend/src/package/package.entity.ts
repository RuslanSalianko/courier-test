import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from '../order/order.entity';
import { IPackageDefault } from './types/package.interface';

@Table({ tableName: 'packages' })
export class Package extends Model<IPackageDefault> implements IPackageDefault {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare numberSign: number;

  @Column({ defaultValue: false })
  declare check?: boolean;

  @ForeignKey(() => Order)
  @Column
  declare orderId: number;

  @BelongsTo(() => Order)
  declare orders: Order;
}
