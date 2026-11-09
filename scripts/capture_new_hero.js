import puppeteer from 'puppeteer-core';
import path from 'path';

const outDir = '/home/indrasetyaariirawan/.gemini/antigravity/brain/89b0024b-dfe8-4374-a9b4-c351890f3bae';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  await page.screenshot({ path: path.join(outDir, 'matthew_new_profile_hero.png') });

  // Light Mode
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle Theme"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(outDir, 'matthew_new_profile_light.png') });

  // Mobile View
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle Theme"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'matthew_new_profile_mobile.png') });

  await browser.close();
  console.log('Successfully captured new hero screenshots!');
}

main().catch(console.error);
