import { IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { ICourierDefault } from '../types/courier.interface';

export class CreateCourierDTO implements ICourierDefault {
  @IsString()
  lastName: string;

  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsNumber()
  numberOrders: number;

  @IsString()
  startWork: string;

  @IsString()
  endWork: string;

  @IsString()
  numberAuto: string;

  @IsPhoneNumber()
  phone: string;

  @IsNumber()
  cityId: number;
}
