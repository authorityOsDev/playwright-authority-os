import { APIRequestContext } from '@playwright/test';
import { ApiRequest } from '@utils/api.request';

/**
 * ApiHelper — Authority OS test data teardown utilities.
 *
 * Use in afterEach / afterAll hooks to clean up test data via API
 * instead of navigating through the UI — 10-100x faster.
 *
 * This is a TEMPLATE utility. Wire it up in your own tests like this:
 *
 *   let createdOrderId: string;
 *
 *   test('create an order', async ({ request, page }) => {
 *     // ... test creates an order ...
 *     createdOrderId = '123';
 *   });
 *
 *   test.afterEach(async ({ request }) => {
 *     if (createdOrderId) {
 *       await ApiHelper.deleteResource(createdOrderId, '/api/orders', request);
 *       createdOrderId = '';
 *     }
 *   });
 *
 * Required env vars:
 *   BASE_URL   — already in .env
 *   API_TOKEN  — add to .env if your API requires bearer auth (leave blank if not needed)
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
