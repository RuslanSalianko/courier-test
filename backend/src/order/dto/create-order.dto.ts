import { CreateDeliveryDTO } from 'src/delivery/dto/create-delivery.dto';

export class CreateOrderDTO {
  delivery: CreateDeliveryDTO;
  packagesNumber: number;
}
