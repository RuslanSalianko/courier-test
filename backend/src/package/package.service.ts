import { BadRequestException, Injectable } from '@nestjs/common';
import { Package } from './package.entity';
import { InjectModel } from '@nestjs/sequelize';
import { ERROR_CHECK_PACKAGE } from './package.constants';
import { EOrderStatus } from 'src/order/types/order-status.enum';
import { Order } from 'src/order/order.entity';
import { Sequelize } from 'sequelize-typescript';
import { IPackageDefault } from './types/package.interface';

@Injectable()
export class PackageService {
  constructor(
    @InjectModel(Package)
    private readonly packageRepository: typeof Package,
    @InjectModel(Order) private readonly orderRepository: typeof Order,
    private readonly sequelize: Sequelize,
  ) {}

  async findAll(): Promise<Package[]> {
    return this.packageRepository.findAll();
  }

  async createMany(packages: IPackageDefault[]) {
    return this.packageRepository.bulkCreate(packages, {
      returning: true,
    });
  }

  async checkPackage(numberSign: number, orderId: number): Promise<void> {
    const transaction = await this.sequelize.transaction();
    try {
      const countCheck = await this.packageRepository.count({
        where: { orderId, check: true },
      });
      const countPackages = await this.packageRepository.count({
        where: { orderId },
      });

      if (countCheck === 0) {
        await this.orderRepository.update(
          { status: EOrderStatus.IN_PROGRESS },
          { where: { id: orderId }, transaction },
        );
      }

      if (countCheck === countPackages - 1) {
        await this.orderRepository.update(
          { status: EOrderStatus.DELIVERY },
          { where: { id: orderId }, transaction },
        );
      }

      await this.packageRepository.update(
        { check: true },
        { where: { orderId, numberSign: numberSign }, transaction },
      );
      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw new BadRequestException(ERROR_CHECK_PACKAGE);
    }
  }
}
