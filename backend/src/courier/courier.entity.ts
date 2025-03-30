import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from '../order/order.entity';
import { City } from 'src/city/city.entity';
import { ICourierDefault } from './types/courier.interface';

@Table({ tableName: 'couriers' })
export class Courier extends Model<ICourierDefault> implements ICourierDefault {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  declare lastName: string;

  @Column
  declare firstName: string;

  @Column
  declare middleName: string;

  @Column
  declare numberOrders: number;

  @Column
  declare startWork: string;

  @Column
  declare endWork: string;

  @Column
  declare numberAuto: string;

  @Column
  declare phone: string;

  @ForeignKey(() => City)
  @Column
  declare cityId: number;

  @BelongsTo(() => City)
  declare city: City;

  @HasMany(() => Order)
  declare orders: Order[];
}
