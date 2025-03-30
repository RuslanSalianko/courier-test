import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { Courier } from './courier.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { DistributionCourierService } from './distribution-courier.service';

@Module({
  imports: [SequelizeModule.forFeature([Courier])],
  providers: [CourierService, DistributionCourierService],
  controllers: [CourierController],
  exports: [CourierService, DistributionCourierService],
})
export class CourierModule {}
