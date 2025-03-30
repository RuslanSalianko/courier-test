import { IOrder } from './order';

export interface IPackage {
  id: number;
  numberSign: number;
  check: boolean;
  orderId: number;
  order: IOrder;
}
