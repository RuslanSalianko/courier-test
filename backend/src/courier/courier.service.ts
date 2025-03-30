import { Injectable, NotFoundException } from '@nestjs/common';
import { Courier } from './courier.entity';
import { ERROR_COURIER_NOT_FOUND } from './couriet.constants';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCourierDTO } from './dto/create-courier.dto';
import { literal, Op } from 'sequelize';
import { EOrderStatus } from 'src/order/types/order-status.enum';
import { Order } from 'src/order/order.entity';
import { Delivery } from 'src/delivery/delivery.entity';

@Injectable()
export class CourierService {
  constructor(
    @InjectModel(Courier)
    private readonly courierRepository: typeof Courier,
  ) {}

  async findById(id: number): Promise<Courier> {
    const candidate = await this.courierRepository.findOne({
      where: { id },
      include: { all: true },
    });

    if (!candidate) {
      throw new NotFoundException(ERROR_COURIER_NOT_FOUND);
    }

    return candidate;
  }

  async findAllByCityIdAndTime(
    cityId: number,
    dateDelivery: Date,
  ): Promise<Courier[]> {
    const dateDeliveryStr = this.formatTime(dateDelivery);
    const timeInterval = this.timeIntervalHouse(dateDelivery);
    // поиск курьера у которого число число заказов в опредееный  час  меньше числа max числа заказов за час
    return this.courierRepository.findAll({
      where: {
        cityId,
        numberOrders: {
          [Op.gt]: literal(`
          (SELECT COUNT(*) 
           FROM "orders" AS "Order"
           INNER JOIN "deliveries" AS "Delivery" ON "Order"."deliveryId" = "Delivery"."id"
           WHERE "Order"."courierId" = "Courier"."id"
             AND "Order"."status" != '${EOrderStatus.COMPLETE}'
             AND "Delivery"."dateDelivery" BETWEEN :from AND :to)
        `),
        },
        startWork: { [Op.lte]: dateDeliveryStr },
        endWork: { [Op.gte]: dateDeliveryStr },
      },
      include: [
        {
          model: Order,
          include: [Delivery],
        },
      ],
      replacements: {
        from: timeInterval.from.toISOString(),
        to: timeInterval.to.toISOString(),
      },
    });
  }
  private formatTime(date: Date): string {
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  private timeIntervalHouse(date: Date) {
    const from = new Date(date);
    from.setHours(from.getHours(), 0, 0, 0);

    const to = new Date(date);
    to.setHours(to.getHours() + 1, 0, 0, 0);

    return { to, from };
  }

  async findAll(): Promise<Courier[]> {
    return this.courierRepository.findAll({ include: { all: true } });
  }

  async create(data: CreateCourierDTO): Promise<Courier> {
    return this.courierRepository.create({ ...data });
  }
}
