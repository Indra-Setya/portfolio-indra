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

  // 1. Scroll to Experience (Jejak Langkah)
  await page.evaluate(() => {
    document.getElementById('pengalaman')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'matthew_sjp_01_experience.png') });
  console.log('1. Experience captured');

  // 2. Scroll to Projects (Karya Pilihan)
  await page.evaluate(() => {
    document.getElementById('proyek')?.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(outDir, 'matthew_sjp_02_projects.png') });
  console.log('2. Projects captured');

  // 3. Click Presensi SJP to open Case Study modal
  await page.evaluate(() => {
    const titles = Array.from(document.querySelectorAll('h4'));
    const sjp = titles.find(t => t.textContent && t.textContent.includes('PRESENSI SJP'));
    if (sjp) {
      sjp.click();
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(outDir, 'matthew_sjp_03_modal.png') });
  console.log('3. Modal captured');

  await browser.close();
  console.log('All SJP screenshots captured successfully!');
}

main().catch(console.error);
