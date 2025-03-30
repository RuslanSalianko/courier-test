import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order.entity';
import { Delivery } from 'src/delivery/delivery.entity';
import { Package } from 'src/package/package.entity';
import { CourierModule } from 'src/courier/courier.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order, Delivery, Package]),
    CourierModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
