import { Injectable } from '@nestjs/common';
import { Delivery } from './delivery.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDeliveryDTO } from './dto/create-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery) private readonly deliveryRepository: typeof Delivery,
  ) {}

  async findAll(): Promise<Delivery[]> {
    return this.deliveryRepository.findAll();
  }

  async create(data: CreateDeliveryDTO): Promise<Delivery> {
    return this.deliveryRepository.create(data);
  }
}
