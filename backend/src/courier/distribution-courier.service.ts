import { Injectable } from '@nestjs/common';
import { CourierService } from './courier.service';
import { Order } from 'src/order/order.entity';

@Injectable()
export class DistributionCourierService {
  constructor(private readonly courierService: CourierService) {}

  async couriers(
    orders: Order[],
  ): Promise<{ orderId: number; courierId: number }[]> {
    const distributedOrders: { orderId: number; courierId: number }[] = [];
    for (const order of orders) {
      const couriers = await this.courierService.findAllByCityIdAndTime(
        order.delivery.cityId,
        order.delivery.dateDelivery,
      );

      if (!couriers.length) {
        continue;
      }

      // min загруженость
      const workload = couriers.map((courier) =>
        Math.ceil(courier.orders.length / courier.numberOrders),
      );
      const minWorkload = Math.min(...workload);
      const minCourierIndex = workload.indexOf(minWorkload);

      distributedOrders.push({
        orderId: order.id,
        courierId: couriers[minCourierIndex].id,
      });
    }
    return distributedOrders;
  }
}
