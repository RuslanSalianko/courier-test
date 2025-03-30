import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsStringService {
  leftFillNum(num: string | number, targetLength: number) {
    return num.toString().padStart(targetLength, '0');
  }
}
