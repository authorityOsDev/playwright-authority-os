/* eslint-disable no-console */
import { Client } from '@notionhq/client';
import * as dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Set NOTION_TEST_INVENTORY_DB in your .env to the ID of your Test Inventory database.
// Open the database as a full page in Notion, copy the ID from the URL:
// https://www.notion.so/YOUR-WORKSPACE/<THIS_IS_THE_ID>?v=...
const TEST_INVENTORY_DB = process.env.NOTION_TEST_INVENTORY_DB;

if (!TEST_INVENTORY_DB) {
  console.error('❌ NOTION_TEST_INVENTORY_DB is not set in .env');
  console.error('   Add it: NOTION_TEST_INVENTORY_DB=your_database_id_here');
  process.exit(1);
}

const tests = [
  { name: 'Valid user should access inventory',                            feature: 'Authentication', priority: 'Critical', businessValue: 'High',   note: 'Revenue blocker — if login fails, nothing works' },
  { name: 'Locked user should see error message',                          feature: 'Authentication', priority: 'Critical', businessValue: 'High',   note: 'Security critical — prevents unauthorized access' },
  { name: 'Invalid credentials should be rejected',                        feature: 'Authentication', priority: 'Critical', businessValue: 'High',   note: 'Security integrity — authentication must be bulletproof' },
  { name: 'Should display product list',                                   feature: 'Inventory',      priority: 'High',     businessValue: 'High',   note: 'Core catalog visibility — foundation of every sale' },
  { name: 'Should show at least 6 products',                               feature: 'Inventory',      priority: 'Medium',   businessValue: 'Medium', note: 'Catalog completeness — detects missing product data' },
  { name: 'Should verify inventory consistency between API and UI',        feature: 'Hybrid / API',   priority: 'High',     businessValue: 'High',   note: 'Data integrity — prevents UI showing unavailable products' },
  { name: 'Should sort products by price (Low to High)',                   feature: 'Filters',        priority: 'Medium',   businessValue: 'Medium', note: 'UX conversion — affects buyer decision-making' },
  { name: 'Should persist cart items after navigating back',               feature: 'Cart',           priority: 'High',     businessValue: 'High',   note: 'Lost cart = lost sale — direct revenue impact' },
  { name: 'Should complete checkout from cart to finish',                  feature: 'Checkout',       priority: 'Critical', businessValue: 'High',   note: 'Primary revenue flow — most business-critical path' },
  { name: 'Should complete checkout after adding Backpack and Bike Light', feature: 'Checkout',       priority: 'Critical', businessValue: 'High',   note: 'Upsell flow — higher order value transactions' },
  { name: 'Should show error when checkout info is missing',               feature: 'Validation',     priority: 'Medium',   businessValue: 'Medium', note: 'UX guard — prevents bad data reaching order processing' },
  { name: 'GET / — application responds with HTTP 200',                    feature: 'Hybrid / API',   priority: 'High',     businessValue: 'High',   note: 'Environment health — first signal of any outage' },
  { name: 'GET / — response time is under 3 seconds',                      feature: 'Hybrid / API',   priority: 'High',     businessValue: 'High',   note: 'Performance baseline — SLA health check on every run' },
  { name: 'GET / — response contains expected HTML content-type',          feature: 'Hybrid / API',   priority: 'Medium',   businessValue: 'Medium', note: 'Protocol integrity — detects misconfigured CDN or proxy' },
  { name: 'Should display correct product name and price',                  feature: 'Product Detail', priority: 'High',     businessValue: 'High',   note: 'Catalog accuracy — wrong price = wrong sale' },
  { name: 'Should add and remove product directly from detail page',        feature: 'Product Detail', priority: 'High',     businessValue: 'High',   note: 'Cart flow — alternative entry point to checkout' },
  { name: 'Should match product detail page visual snapshot',               feature: 'Product Detail', priority: 'Medium',   businessValue: 'Medium', note: 'Visual regression — detects unintended UI changes on product page' },
];

async function seed() {
  console.log(`Seeding ${tests.length} tests into Test Inventory...\n`);

  for (const t of tests) {
    try {
      await notion.pages.create({
        parent: { database_id: TEST_INVENTORY_DB! },
        properties: {
          'Name':              { title: [{ text: { content: t.name } }] },
          'Feature':           { multi_select: [{ name: t.feature }] },
          'Priority':          { select: { name: t.priority } },
          'Automation Status': { status: { name: 'Done' } },
          'Business Value':    { select: { name: t.businessValue } },
        },
      });
      console.log(`✅ ${t.name}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`❌ ${t.name} — ${msg}`);
    }
  }

  console.log('\n✅ Seed complete.');
}

seed();
