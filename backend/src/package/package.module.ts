import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Package } from './package.entity';
import { Order } from 'src/order/order.entity';

@Module({
  imports: [SequelizeModule.forFeature([Package, Order])],
  providers: [PackageService],
  controllers: [PackageController],
  exports: [PackageService],
})
export class PackageModule {}
