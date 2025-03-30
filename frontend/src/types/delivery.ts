import { ICity } from './city';
import { IOrder } from './order';

export enum EDeliveryType {
  PICKUP = 50,
  GENERAL = 70,
  EXPRESS = 75,
}

export interface IDelivery {
  id: number;
  order: IOrder;
  dateDelivery: Date;
  cityId: number;
  address: string;
  coordinates: string;
  type: EDeliveryType;
  city: ICity;
}
