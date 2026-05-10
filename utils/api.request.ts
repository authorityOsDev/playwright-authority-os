import { APIRequestContext, request, test } from '@playwright/test';

/**
 * ApiRequest — Authority OS HTTP utility.
 *
 * Two usage modes:
 *
 * 1. Inside a test (preferred) — pass the injected `request` fixture so the
 *    context is managed by Playwright's lifecycle and appears in the trace viewer:
 *
 *    test('example', async ({ request }) => {
 *      const res = await ApiRequest.get(url, undefined, request);
 *    });
 *
 * 2. Outside a test (e.g. global setup scripts) — omit the context argument and
 *    a temporary context is created and immediately disposed.
 */
export class ApiRequest {

  static async get(endpoint: string, token?: string, ctx?: APIRequestContext) {
    return await test.step(`API GET: ${endpoint}`, async () => {
      const context  = ctx ?? await request.newContext();
      const response = await context.get(endpoint, {
        headers: { 'Authorization': token ? `Bearer ${token}` : '' },
      });
      if (!ctx) await context.dispose();
      return response;
    });
  }

  static async post(endpoint: string, data: object, token?: string, ctx?: APIRequestContext) {
    return await test.step(`API POST: ${endpoint}`, async () => {
      const context  = ctx ?? await request.newContext();
      const response = await context.post(endpoint, {
        data,
        headers: {
          'Content-Type':  'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      if (!ctx) await context.dispose();
      return response;
    });
  }

  static async delete(endpoint: string, token?: string, ctx?: APIRequestContext) {
    return await test.step(`API DELETE: ${endpoint}`, async () => {
      const context  = ctx ?? await request.newContext();
      const response = await context.delete(endpoint, {
        headers: { 'Authorization': token ? `Bearer ${token}` : '' },
      });
      if (!ctx) await context.dispose();
      return response;
    });
  }
}
