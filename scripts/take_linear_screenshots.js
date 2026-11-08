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
  await new Promise(r => setTimeout(r, 600));

  console.log('1. Capturing Hero Section (Dark)...');
  await page.screenshot({ path: path.join(outDir, 'linear_01_hero.png') });

  console.log('2. Capturing About & GitHub Heatmap...');
  await page.evaluate(() => {
    document.getElementById('tentang')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'linear_02_about.png') });

  console.log('3. Capturing Experience Timeline...');
  await page.evaluate(() => {
    document.getElementById('pengalaman')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'linear_03_experience.png') });

  console.log('4. Capturing Projects Bento Grid...');
  await page.evaluate(() => {
    document.getElementById('proyek')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'linear_04_projects.png') });

  console.log('5. Capturing Project Modal...');
  await page.evaluate(() => {
    // Click the first case study button
    const buttons = Array.from(document.querySelectorAll('#proyek button'));
    const caseBtn = buttons.find(b => b.textContent && b.textContent.includes('Studi Kasus'));
    if (caseBtn) caseBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'linear_05_modal.png') });

  // Close modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Tutup modal"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  console.log('6. Capturing Certifications...');
  await page.evaluate(() => {
    document.getElementById('sertifikasi')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'linear_06_certifications.png') });

  console.log('7. Capturing Contact & Footer...');
  await page.evaluate(() => {
    document.getElementById('kontak')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'linear_07_contact.png') });

  console.log('8. Capturing Minimal Footer...');
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'linear_08_footer.png') });

  // Light Mode Toggle
  console.log('9. Toggling Light Mode & Capturing Hero (Light)...');
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const toggleBtn = document.querySelector('button[aria-label="Toggle Theme"]');
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(outDir, 'linear_09_light_hero.png') });

  console.log('10. Capturing About in Light Mode...');
  await page.evaluate(() => {
    document.getElementById('tentang')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 700));
  await page.screenshot({ path: path.join(outDir, 'linear_10_light_about.png') });

  // Mobile View
  console.log('11. Capturing Mobile View (375px)...');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    // Switch back to dark mode
    const toggleBtn = document.querySelector('button[aria-label="Toggle Theme"]');
    if (toggleBtn) toggleBtn.click();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(outDir, 'linear_11_mobile_hero.png') });

  console.log('12. Capturing Mobile Menu Overlay...');
  await page.evaluate(() => {
    const menuBtn = document.querySelector('button[aria-label="Toggle Menu"]');
    if (menuBtn) menuBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, 'linear_12_mobile_menu.png') });

  await browser.close();
  console.log('All Linear screenshots taken successfully!');
}

main().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
