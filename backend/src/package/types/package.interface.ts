import { IOrder } from 'src/order/types/order.interface';

export interface IPackageDefault {
  id?: number;
  numberSign: number;
  check?: boolean;
  orderId: number;
}

export interface IPackage extends IPackageDefault {
  id: number;
  check: boolean;
  order: IOrder;
}
