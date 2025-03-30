import { ICity } from './city';
import { IOrder } from './order';

export interface ICourier {
  id: number;
  lastName: string;
  firstName: string;
  middleName: string;
  numberOrders: number;
  startWork: string;
  endWork: string;
  numberAuto: string;
  phone: string;
  cityId: number;
  orders: IOrder[];
  city: ICity;
}
