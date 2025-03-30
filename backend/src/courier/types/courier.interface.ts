import { ICity } from 'src/city/types/city.interface';
import { IOrder } from 'src/order/types/order.interface';

export interface ICourierDefault {
  id?: number;
  lastName: string;
  firstName: string;
  middleName: string;
  numberOrders: number;
  startWork: string;
  endWork: string;
  numberAuto: string;
  phone: string;
  cityId: number;
}

export interface ICourier extends ICourierDefault {
  id: number;
  orders: IOrder[];
  city: ICity;
}
