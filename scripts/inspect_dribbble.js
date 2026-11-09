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

  const url = 'https://dribbble.com/shots/22469576-Matthew-Personal-Portfolio-Website-Animation';
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

  await new Promise(r => setTimeout(r, 3000));

  // Take screenshot of the dribbble shot
  await page.screenshot({ path: path.join(outDir, 'dribbble_shot_22469576.png') });

  // Extract video src or media src
  const mediaInfo = await page.evaluate(() => {
    const video = document.querySelector('video');
    const videoSrc = video ? (video.src || video.querySelector('source')?.src) : null;
    const images = Array.from(document.querySelectorAll('img')).map(i => i.src);
    const title = document.title;
    const desc = document.querySelector('.shot-desc')?.innerText || document.querySelector('meta[name="description"]')?.getAttribute('content');
    return { title, desc, videoSrc, images: images.slice(0, 10) };
  });

  console.log('Media Info:', JSON.stringify(mediaInfo, null, 2));

  await browser.close();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
