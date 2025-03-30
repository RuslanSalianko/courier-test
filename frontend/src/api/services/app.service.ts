import $api from '..';

class AppService {
  async seeders() {
    await $api.get('/seeders');
  }

  async seedersOrders() {
    await $api.get('/seeders/orders');
  }
}

export const appService = new AppService();
