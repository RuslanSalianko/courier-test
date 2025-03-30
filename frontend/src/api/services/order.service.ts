import { IOrder } from '@/types';
import $api from '..';

class OrderService {
  constructor() {}

  async findByCourierId(id: number): Promise<IOrder[] | undefined> {
    try {
      if (!id) return [];

      const req = await $api.get<IOrder[]>(`/order/courier/${id}`);
      return req.data;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: number): Promise<IOrder | undefined> {
    try {
      const req = await $api.get<IOrder>(`/order/${id}`);

      return req.data;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<IOrder[] | undefined> {
    try {
      const req = await $api.get<IOrder[]>('/order');
      return req.data;
    } catch (error) {
      console.log(error);
    }
  }

  async payments(ids: readonly number[]) {
    try {
      const req = await $api.post('/order/payments', { ids });
      return req.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const orderService = new OrderService();
