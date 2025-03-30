import { ICourier } from '@/types';
import $api from '..';

class CourierService {
  constructor() {}
  async findAll(): Promise<ICourier[] | undefined> {
    try {
      const req = await $api.get<ICourier[]>('/courier');
      return req.data;
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: number): Promise<ICourier | undefined> {
    try {
      const req = await $api.get<ICourier>(`/courier/${id}`);
      return req.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const courierService = new CourierService();
