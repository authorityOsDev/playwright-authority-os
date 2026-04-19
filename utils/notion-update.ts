import { Client } from '@notionhq/client';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID as string;

async function updateNotion() {
  const resultsPath = path.join(process.cwd(), 'test-results/results.json');

  if (!fs.existsSync(resultsPath)) {
    console.error('❌ Results file not found at test-results/results.json');
    console.error('   Run "npm run ship-it" to generate results first.');
    process.exit(1);
  }

  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));

  const totalTests = results.stats.expected + results.stats.unexpected + results.stats.flaky;
  const passedTests = results.stats.expected;
  const durationSec = Math.round((results.stats.duration ?? 0) / 1000);
  const status = results.stats.unexpected === 0 ? 'Passed' : 'Failed';
  const runDate = new Date();
  const buildId = process.env.GITHUB_RUN_NUMBER
    ? `#${process.env.GITHUB_RUN_NUMBER}`
    : `Local ${runDate.toISOString().slice(0, 16).replace('T', ' ')}`;
  const scenarioTitle = `Build ${buildId} — ${status}`;
  const reportLink = 'https://authority-os-report.surge.sh';

  // Step 1 — write core properties (always required)
  const page = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      'Scenario':    { title: [{ text: { content: scenarioTitle } }] },
      'Status':      { select: { name: status } },
      'Total Tests': { number: totalTests },
      'Passed':      { number: passedTests },
      'Report Link': { url: reportLink },
      'Run Date':    { date: { start: runDate.toISOString() } },
    },
  });

  // Step 2 — write Duration (optional, skipped if column not accessible)
  try {
    await notion.pages.update({
      page_id: page.id,
      properties: {
        'Duration (s)': { number: durationSec },
      },
    });
  } catch {
    console.warn('⚠️  Duration column not found — skipping.');
  }

  console.log(`✅ Notion: run logged — ${scenarioTitle}`);
}

updateNotion().catch((error: any) => {
  console.error('❌ Notion update failed:', error.body || error.message || error);
  process.exit(1);
});
