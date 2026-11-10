import puppeteer from 'puppeteer-core';
import path from 'path';

const outDir = '/home/indrasetyaariirawan/Random/portfolio-indra/scripts';

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
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 800));

  // Scroll to globe on mobile
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('h3'));
    const globe = headers.find(h => h.textContent && h.textContent.includes('Arsitektur Jaringan Cloud 3D'));
    if (globe) {
      globe.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));

  const targetDir = '/home/indrasetyaariirawan/.gemini/antigravity/brain/89b0024b-dfe8-4374-a9b4-c351890f3bae';
  await page.screenshot({ path: path.join(targetDir, 'matthew_3d_06_mobile_globe.png') });
  console.log('Mobile screenshot captured!');

  await browser.close();
}

main().catch(console.error);
