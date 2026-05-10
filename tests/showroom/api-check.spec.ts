/**
 * API Layer Tests — pure HTTP assertions, no browser.
 *
 * These tests verify the API independently of the UI.
 * They run faster, catch backend regressions early, and complement
 * the UI tests by isolating which layer is broken when something fails.
 *
 * Contrast with hybrid.spec.ts, which uses an API call as a precondition
 * before asserting UI state.
 */
import { test, expect } from '@playwright/test';
import { EnvFactory }   from '@utils/env-factory';

test.describe('API Layer: Environment Health', { tag: '@smoke' }, () => {

  test('GET / — application responds with HTTP 200', async ({ request }) => {
    const response = await request.get(EnvFactory.baseUrl);

    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  });

  test('GET / — response time is under 3 seconds', async ({ request }) => {
    const start    = Date.now();
    const response = await request.get(EnvFactory.baseUrl);
    const duration = Date.now() - start;

    expect(response.ok()).toBeTruthy();
    expect(duration).toBeLessThan(3000);
  });

  test('GET / — response contains expected HTML content-type', async ({ request }) => {
    const response    = await request.get(EnvFactory.baseUrl);
    const contentType = response.headers()['content-type'] ?? '';

    expect(contentType).toContain('text/html');
  });
});
