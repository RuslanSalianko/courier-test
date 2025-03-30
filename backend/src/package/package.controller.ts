import { Controller, Get, Param } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get('check/:numberSign/:orderId')
  async checkPackage(
    @Param('numberSign') numberSign: number,
    @Param('orderId') orderId: number,
  ) {
    await this.packageService.checkPackage(numberSign, orderId);
    return { message: 'OK' };
  }
}
