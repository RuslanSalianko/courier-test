import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Post('payments')
  async payments(@Body('ids') ids: number[]) {
    try {
      await this.orderService.payments(ids);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async order(@Param('id') id: number) {
    return this.orderService.findById(id);
  }

  @Get('courier/:id')
  async findByCourierId(@Param('id') id: number) {
    return this.orderService.findAllByCourierId(id);
  }
}
