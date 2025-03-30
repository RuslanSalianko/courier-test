import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('seeders')
  seeders(): string {
    this.appService.seeders();
    return 'ok';
  }

  @Get('seeders/orders')
  seeders2(): string {
    this.appService.seedersOrders();
    return 'ok';
  }
}
