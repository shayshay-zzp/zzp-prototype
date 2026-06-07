import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:5500';
const PAGES = [
  'dashboard', 'onboarding', 'store', 'datahub', 'products', 'orders', 'inventory',
  'returns', 'affiliate', 'koc', 'agency', 'samples', 'content', 'livestream',
  'campaigns', 'vouchers', 'ads', 'executive', 'revenue', 'profit', 'costs',
  'product-analytics', 'affiliate-analytics', 'creator-analytics', 'content-analytics',
  'live-analytics', 'customer-analytics', 'team', 'alerts', 'opportunities',
  'forecast', 'benchmark', 'actions', 'automation', 'optimization', 'workflows',
  'notifications', 'audit', 'settings', 'education', 'compliance', 'growth-assistant'
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
const results = [];

page.on('pageerror', (err) => errors.push(`[${page.url()}] ${err.message}`));
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`);
});

await page.goto(`${BASE}/#dashboard`, { waitUntil: 'networkidle', timeout: 30000 });

for (const id of PAGES) {
  try {
    await page.goto(`${BASE}/#${id}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(400);
    const main = page.locator('#main-content');
    const empty = (await main.innerText()).trim().length < 20;
    const tabs = await page.locator('.ds-tab').count();
    const tabCount = tabs;
    if (tabCount > 0) {
      for (let i = 0; i < tabCount; i++) {
        await page.locator('.ds-tab').nth(i).click();
        await page.waitForTimeout(250);
      }
    }
    results.push({ id, ok: !empty, tabs: tabCount, title: await page.locator('#page-title').innerText() });
  } catch (e) {
    results.push({ id, ok: false, error: e.message });
  }
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(JSON.stringify({ total: PAGES.length, failed: failed.length, errors: errors.slice(0, 10), results }, null, 2));
process.exit(failed.length || errors.length ? 1 : 0);
