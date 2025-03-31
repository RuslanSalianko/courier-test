import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDTO } from './dto/create-order.dto';
import { Delivery } from 'src/delivery/delivery.entity';
import { Package } from 'src/package/package.entity';
import { Sequelize } from 'sequelize-typescript';
import { Courier } from 'src/courier/courier.entity';
import { City } from 'src/city/city.entity';
import { EOrderStatus } from './types/order-status.enum';
import { DistributionCourierService } from 'src/courier/distribution-courier.service';
import { IPackageDefault } from 'src/package/types/package.interface';
import { ERROR_ORDER_NOT_FOUND } from './order.constants';

@Injectable()
export class OrderService {
  private readonly include = [
    { model: Delivery, include: [City] },
    Package,
    Courier,
  ];

  constructor(
    @InjectModel(Order) private readonly orderRepository: typeof Order,
    @InjectModel(Delivery) private readonly deliveryRepository: typeof Delivery,
    @InjectModel(Package) private readonly packageRepository: typeof Package,
    private readonly sequelize: Sequelize,
    private readonly distributionService: DistributionCourierService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAll({
      include: this.include,
    });
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.orderRepository.findOne({
      where: { id },
      include: this.include,
    });

    if (!order) {
      throw new NotFoundException(ERROR_ORDER_NOT_FOUND);
    }

    return order;
  }

  async findAllByCourierId(id: number): Promise<Order[]> {
    const order = this.orderRepository.findAll({
      where: { courierId: id },
      include: this.include,
    });

    if (!order) {
      throw new NotFoundException(ERROR_ORDER_NOT_FOUND);
    }

    return order;
  }

  async create(data: CreateOrderDTO): Promise<void> {
    const transaction = await this.sequelize.transaction();

    try {
      const delivery = await this.deliveryRepository.create(data.delivery, {
        transaction,
      });

      const order = await this.orderRepository.create(
        {
          deliveryId: delivery.id,
        },
        {
          transaction,
        },
      );

      const packagesData: IPackageDefault[] = [];
      for (let i = 0; i < data.packagesNumber; i++) {
        packagesData.push({
          orderId: order.id,
          numberSign: i + 1,
        });
      }
      await this.packageRepository.bulkCreate(packagesData, {
        returning: true,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async payments(ids: number[]) {
    const transaction = await this.sequelize.transaction();

    const orders = await this.orderRepository.findAll({
      where: { id: ids },
      include: this.include,
      order: [['delivery', 'dateDelivery', 'ASC']],
    });

    const couriers = await this.distributionService.couriers(orders);

    await this.orderRepository.update(
      { status: EOrderStatus.PAID },
      { where: { id: ids }, transaction },
    );

    try {
      for (const courier of couriers) {
        await this.orderRepository.update(
          { status: EOrderStatus.ASSIGNED, courierId: courier.courierId },
          { where: { id: courier.orderId }, transaction },
        );
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
