import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { City } from './city.entity';

@Module({
  imports: [SequelizeModule.forFeature([City])],
  providers: [CityService],
  controllers: [CityController],
  exports: [CityService],
})
export class CityModule {}
