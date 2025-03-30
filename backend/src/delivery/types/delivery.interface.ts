import { ICity } from 'src/city/types/city.interface';
import { IOrder } from 'src/order/types/order.interface';

export enum EDeliveryType {
  PICKUP = 50,
  GENERAL = 70,
  EXPRESS = 75,
}
export interface IDeliveryDefault {
  id?: number;
  dateDelivery: Date;
  cityId: number;
  address: string;
  coordinates: string;
  type: EDeliveryType;
}

export interface IDelivery extends IDeliveryDefault {
  id: number;
  order: IOrder;
  city: ICity;
}
