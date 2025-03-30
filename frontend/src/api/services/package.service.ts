import $api from '..';

class PackageService {
  async checkPackage(id: number, orderId: number): Promise<string | undefined> {
    try {
      const req = await $api.get<string>(`/package/check/${id}/${orderId}`);
      return req.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export const packageService = new PackageService();
