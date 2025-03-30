import { EDeliveryType, IDeliveryDefault } from '../types/delivery.interface';

export class CreateDeliveryDTO implements IDeliveryDefault {
  address: string;
  coordinates: string;
  type: EDeliveryType;
  cityId: number;
  dateDelivery: Date;
}
