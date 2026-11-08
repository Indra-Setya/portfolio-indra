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

  console.log('Navigating to http://localhost:4173 ...');
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });

  // Wait 1.6s for bootloader to finish
  await new Promise(r => setTimeout(r, 1600));

  console.log('Capturing Hero IDE...');
  await page.screenshot({ path: path.join(outDir, 'codebase_01_hero_ide.png') });

  console.log('Scrolling to Tentang & Terminal...');
  await page.evaluate(() => {
    document.getElementById('tentang')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'codebase_02_about_terminal.png') });

  console.log('Scrolling to Git Log...');
  await page.evaluate(() => {
    document.getElementById('pengalaman')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'codebase_03_git_log.png') });

  console.log('Scrolling to Projects API...');
  await page.evaluate(() => {
    document.getElementById('proyek')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'codebase_04_projects_api.png') });

  console.log('Scrolling to Certs Lock...');
  await page.evaluate(() => {
    document.getElementById('sertifikasi')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'codebase_05_certs_lock.png') });

  console.log('Scrolling to Contact HTTP...');
  await page.evaluate(() => {
    document.getElementById('kontak')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'codebase_06_contact_http.png') });

  console.log('Capturing VS Code Status Bar Footer...');
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'codebase_07_footer_vscode.png') });

  // Light Mode Capture
  console.log('Capturing Light Mode...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const btn = document.querySelector('button[aria-label="Toggle Theme"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'codebase_08_light_mode.png') });

  // Mobile View Capture
  console.log('Capturing Mobile View...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    // Switch back to dark mode
    const btn = document.querySelector('button[aria-label="Toggle Theme"]');
    if (btn) btn.click();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));

  // Open mobile menu
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Buka File Explorer"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'codebase_09_mobile_explorer.png') });

  await browser.close();
  console.log('All Codebase screenshots captured successfully!');
}

main().catch(err => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
