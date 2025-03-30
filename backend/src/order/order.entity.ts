import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Courier } from '../courier/courier.entity';
import { Delivery } from '../delivery/delivery.entity';
import { Package } from '../package/package.entity';
import { DataTypes } from 'sequelize';
import { EOrderStatus } from './types/order-status.enum';
import { IOrderDefault } from './types/order.interface';

@Table({ tableName: 'orders' })
export class Order extends Model<IOrderDefault> implements IOrderDefault {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({
    type: DataTypes.ENUM(...Object.values(EOrderStatus)),
    allowNull: false,
    defaultValue: EOrderStatus.CREATED,
  })
  declare status?: EOrderStatus;

  @ForeignKey(() => Delivery)
  @Column
  declare deliveryId: number;

  @BelongsTo(() => Delivery)
  declare delivery: Delivery;

  @HasMany(() => Package)
  declare packages: Package[];

  @ForeignKey(() => Courier)
  @Column
  declare courierId?: number;

  @BelongsTo(() => Courier)
  declare courier?: Courier;
}
