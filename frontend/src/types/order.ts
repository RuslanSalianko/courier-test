import { IDelivery } from './delivery';
import { IPackage } from './package';
import { ICourier } from './courier';

export enum EOrderStatus {
  CREATED = 'CREATED',
  PAID = 'PAID',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  DELIVERY = 'DELIVERY',
  COMPLETE = 'COMPLETE',
}

export interface IOrder {
  id: number;
  status: EOrderStatus;
  deliveryId: number;
  delivery: IDelivery;
  packages: IPackage[];
  courierId?: number;
  courier?: ICourier;
}
