import { Global, Module } from '@nestjs/common';
import { UtilsStringService } from './string.service';

@Global()
@Module({
  providers: [UtilsStringService],
  exports: [UtilsStringService],
})
export class UtilsModule {}
