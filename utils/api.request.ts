import { request, test } from '@playwright/test';

export class ApiRequest {
  /**
   * Authority Wrapper for API calls. 
   * It ensures consistent headers and clean reporting in Allure.
   */
  static async post(endpoint: string, data: object, token?: string) {
    return await test.step(`API POST Request: ${endpoint}`, async () => {
      const context = await request.newContext();
      const response = await context.post(endpoint, {
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });
      
      // We return the full response for further assertions
      return response;
    });
  }

  static async get(endpoint: string, token?: string) {
    return await test.step(`API GET Request: ${endpoint}`, async () => {
      const context = await request.newContext();
      const response = await context.get(endpoint, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        }
      });
      return response;
    });
  }
}