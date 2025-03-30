import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Order } from '../order/order.entity';
import { City } from 'src/city/city.entity';
import { EDeliveryType, IDeliveryDefault } from './types/delivery.interface';

@Table({ tableName: 'deliveries' })
export class Delivery
  extends Model<IDeliveryDefault>
  implements IDeliveryDefault
{
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare dateDelivery: Date;

  @Column
  declare address: string;

  @Column
  declare coordinates: string;

  @Column
  declare type: EDeliveryType;

  @ForeignKey(() => City)
  @Column
  declare cityId: number;

  @BelongsTo(() => City)
  declare city: City;

  @HasOne(() => Order)
  declare order: Order;
}
