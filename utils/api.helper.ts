import { request, APIRequestContext } from '@playwright/test';

export class ApiHelper {
  /**
   * Deletes a resource via API to keep the environment clean.
   * This is much faster than deleting via UI.
   */
  static async deleteResource(id: string, endpoint: string) {
    const context = await request.newContext();
    const response = await context.delete(`${process.env.BASE_URL}${endpoint}/${id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });
    return response.ok();
  }
}