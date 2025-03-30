import {
  AutoIncrement,
  Column,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Courier } from 'src/courier/courier.entity';
import { Delivery } from 'src/delivery/delivery.entity';
import { ICityDefault } from './types/city.interface';

@Table({ tableName: 'cities' })
export class City extends Model<ICityDefault> implements ICityDefault {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column({ unique: true })
  declare name: string;

  @HasOne(() => Courier)
  courier: Courier;

  @HasOne(() => Delivery)
  delivery: Delivery;
}
