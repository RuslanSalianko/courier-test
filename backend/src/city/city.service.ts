import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from './city.entity';
import { ICityDefault } from './types/city.interface';

@Injectable()
export class CityService {
  constructor(@InjectModel(City) private cityRepository: typeof City) {}

  async findAll() {
    return this.cityRepository.findAll();
  }

  async createMany(cities: ICityDefault[]) {
    return this.cityRepository.bulkCreate(cities, {
      returning: true,
    });
  }
}
