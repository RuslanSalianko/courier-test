import { EOrderStatus } from './order-status.enum';
import { IDelivery } from 'src/delivery/types/delivery.interface';
import { ICourier } from 'src/courier/types/courier.interface';
import { IPackage } from 'src/package/types/package.interface';

export interface IOrderDefault {
  id?: number;
  status?: EOrderStatus;
  deliveryId: number;
  courierId?: number;
}
export interface IOrder extends IOrderDefault {
  id: number;
  status: EOrderStatus;
  deliveryId: number;
  delivery: IDelivery;
  packages: IPackage[];
  courierId?: number;
  courier?: ICourier;
}
