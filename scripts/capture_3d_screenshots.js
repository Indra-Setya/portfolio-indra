import puppeteer from 'puppeteer-core';
import path from 'path';

const outDir = '/home/indrasetyaariirawan/.gemini/antigravity/brain/89b0024b-dfe8-4374-a9b4-c351890f3bae';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-unsafe-swiftshader',
      '--use-gl=angle',
      '--use-angle=swiftshader',
    ],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 960 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Hero
  await page.screenshot({ path: path.join(outDir, 'matthew_3d_01_hero.png') });
  console.log('1. Hero done');

  // 2. Scroll to about
  await page.evaluate(() => {
    document.getElementById('tentang')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'matthew_3d_02_about_photo.png') });
  console.log('2. About Photo done');

  // 3. Switch to 3D Data Core
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.textContent && b.textContent.includes('3D Data Core'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, 'matthew_3d_03_about_3d_core.png') });
  console.log('3. About 3D Core done');

  // 4. Scroll to Cloud Globe
  await page.evaluate(() => {
    const el = document.querySelector('h3');
    const headers = Array.from(document.querySelectorAll('h3'));
    const globe = headers.find(h => h.textContent && h.textContent.includes('Arsitektur Jaringan Cloud 3D'));
    if (globe) {
      globe.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, 'matthew_3d_04_cloud_globe.png') });
  console.log('4. Cloud Globe done');

  // 5. Scroll to Certifications
  await page.evaluate(() => {
    document.getElementById('sertifikasi')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'matthew_3d_05_certifications.png') });
  console.log('5. Certifications done');

  await browser.close();
  console.log('Done!');
}

main().catch(console.error);
