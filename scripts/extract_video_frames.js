import puppeteer from 'puppeteer-core';
import path from 'path';

const outDir = '/home/indrasetyaariirawan/.gemini/antigravity/brain/89b0024b-dfe8-4374-a9b4-c351890f3bae';
const videoUrl = 'https://cdn.dribbble.com/userupload/9824357/file/original-fccdbae5997dd1f7c781a0817d1af5da.mp4';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1200 });

  // Load a simple HTML that plays the video
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000; display:flex; justify-content:center; align-items:center; height:100vh;">
        <video id="vid" src="${videoUrl}" style="max-width:100%; max-height:100%;" muted playsinline></video>
      </body>
    </html>
  `;

  await page.setContent(html);

  // Wait for video metadata
  await page.evaluate(async () => {
    const v = document.getElementById('vid');
    await new Promise(resolve => {
      v.onloadedmetadata = resolve;
      v.load();
    });
  });

  const duration = await page.evaluate(() => document.getElementById('vid').duration);
  console.log('Video duration:', duration, 'seconds');

  // Sample frames across the duration
  const frameTimes = [0.2, 1.5, 3.0, 4.5, 6.0, 7.5, 9.0, 10.5, 12.0, 13.5, 15.0];

  for (let i = 0; i < frameTimes.length; i++) {
    const t = frameTimes[i];
    if (t > duration) break;

    await page.evaluate((time) => {
      const v = document.getElementById('vid');
      v.currentTime = time;
    }, t);

    // Wait for seeked
    await page.evaluate(async () => {
      const v = document.getElementById('vid');
      await new Promise(resolve => {
        if (v.seeking) {
          v.onseeked = resolve;
        } else {
          resolve();
        }
      });
    });

    await new Promise(r => setTimeout(r, 200));

    const shotPath = path.join(outDir, `dribbble_frame_${i}_${t.toFixed(1)}s.png`);
    await page.screenshot({ path: shotPath });
    console.log(`Saved frame ${i} at ${t.toFixed(1)}s -> ${shotPath}`);
  }

  await browser.close();
}

main().catch(err => {
  console.error('Error extracting video frames:', err);
  process.exit(1);
});
