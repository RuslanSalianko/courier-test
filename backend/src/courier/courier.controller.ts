import { Controller, Get, Param } from '@nestjs/common';
import { CourierService } from './courier.service';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Get()
  async couriers() {
    return this.courierService.findAll();
  }

  @Get(':id')
  async courier(@Param('id') id: string) {
    return this.courierService.findById(Number(id));
  }
}
