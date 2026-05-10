import { APIRequestContext } from '@playwright/test';
import { ApiRequest } from '@utils/api.request';

/**
 * ApiHelper — Authority OS test data teardown utilities.
 *
 * Use these in afterEach / afterAll hooks to clean up resources created
 * during a test without going through the UI (10-100x faster).
 *
 * Example:
 *   test.afterEach(async ({ request }) => {
 *     await ApiHelper.deleteResource(createdId, '/api/orders', request);
 *   });
 */
export class ApiHelper {

  /**
   * Deletes a resource by ID via the REST API.
   * Returns true if the delete succeeded (HTTP 2xx), false otherwise.
   */
  static async deleteResource(
    id: string,
    endpoint: string,
    ctx: APIRequestContext,
  ): Promise<boolean> {
    const url      = `${process.env.BASE_URL}${endpoint}/${id}`;
    const token    = process.env.API_TOKEN;
    const response = await ApiRequest.delete(url, token, ctx);
    return response.ok();
  }
}
