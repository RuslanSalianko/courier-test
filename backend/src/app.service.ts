import { Injectable } from '@nestjs/common';
import { fakerRU as faker } from '@faker-js/faker';
import { Courier } from './courier/courier.entity';
import { CourierService } from './courier/courier.service';
import { CreateCourierDTO } from './courier/dto/create-courier.dto';
import { OrderService } from './order/order.service';
import { UtilsStringService } from './utils/string.service';
import { CityService } from './city/city.service';
import { CreateDeliveryDTO } from './delivery/dto/create-delivery.dto';
import { CreateOrderDTO } from './order/dto/create-order.dto';
import { EDeliveryType } from './delivery/types/delivery.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly courierService: CourierService,
    private readonly orderService: OrderService,
    private readonly stringService: UtilsStringService,
    private readonly cityService: CityService,
  ) {}

  async generateCity() {
    const cities: any[] = [];
    const dbCities = await this.cityService.findAll();
    const setCities = new Set<string>();

    for (let i = 0; i < 3; i++) {
      const fakerCity = faker.location.city();

      if (dbCities.find((city) => city.name === fakerCity)) continue;

      setCities.add(fakerCity);
    }

    setCities.forEach((city) => {
      cities.push({ name: city });
    });

    return await this.cityService.createMany(cities);
  }

  async generateCouriers() {
    const couriers: Courier[] = [];
    const cities = await this.cityService.findAll();

    for (let i = 0; i < 5; i++) {
      const startWork =
        this.stringService.leftFillNum(
          faker.number.int({ min: 0, max: 12 }),
          2,
        ) + ':00:00';
      const endWork =
        this.stringService.leftFillNum(
          faker.number.int({ min: 12, max: 24 }),
          2,
        ) + ':00:00';
      const numberAuto =
        this.stringService.leftFillNum(faker.number.int({ max: 9999 }), 2) +
        ` - ${faker.number.int({ min: 1, max: 7 })} ${faker.string.alpha({ length: 2, casing: 'upper' })}`;

      const city = cities[faker.number.int({ min: 0, max: cities.length - 1 })];

      const dataCourier: CreateCourierDTO = {
        lastName: faker.person.lastName(),
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        numberOrders: faker.number.int({ min: 1, max: 10 }),
        startWork,
        endWork,
        numberAuto,
        cityId: city.id,
        phone: faker.phone.number({ style: 'national' }),
      };
      const courier = await this.courierService.create(dataCourier);
      couriers.push(courier);
    }

    return couriers;
  }

  async generateOrders() {
    const cities = await this.cityService.findAll();

    for (let i = 0; i < 100; i++) {
      const city = cities[faker.number.int({ min: 0, max: cities.length - 1 })];
      const delivert: CreateDeliveryDTO = {
        address: faker.location.streetAddress(),
        coordinates: `${faker.location.latitude()}, ${faker.location.longitude()}`,
        type: faker.helpers.enumValue(EDeliveryType),
        cityId: city.id,
        dateDelivery: faker.date.between({
          from: Date.now(),
          to: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        }),
      };

      const packegesNumber = faker.number.int({ min: 1, max: 10 });

      const order: CreateOrderDTO = {
        delivery: delivert,
        packagesNumber: packegesNumber,
      };

      await this.orderService.create(order);
    }
  }

  async seeders() {
    await this.generateCity();
    await this.generateCouriers();
    await this.generateOrders();
  }

  async seedersOrders() {
    await this.generateOrders();
  }
}
