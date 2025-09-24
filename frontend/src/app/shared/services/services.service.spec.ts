import {ServicesService} from "./services.service";

describe('services service', () => {

  let servicesService: ServicesService;
  beforeEach(() => {
    servicesService = new ServicesService();
  });

  it ('should return an array of services', () => {
    const result = servicesService.getServices()
    expect(Array.isArray(result)).toBe(true);
  });

  it ('should return services with all required fields', () => {
    const result = servicesService.getServices();
    const objectKeys = ['image', 'title', 'description', 'price', 'type'];
    expect(result.every(item => objectKeys.every(key => key in item))).toBe(true);
  });

  it ('should return services is not empty', () => {
    const result = servicesService.getServices();
    expect(result.length).toBeGreaterThan(0);
  });
})
