const fs = require('fs');
const puppeteer = require('puppeteer-core');

async function main() {
  const portFile = `${process.env.HOME}/Library/Application Support/Google/Chrome/DevToolsActivePort`;
  const [port, path] = fs.readFileSync(portFile, 'utf8').trim().split('\n');
  const browserWSEndpoint = `ws://127.0.0.1:${port}${path}`;

  const browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  const upstashPage = pages.find((p) => p.url().includes('console.upstash.com'));
  const imagekitPage = pages.find((p) => p.url().includes('imagekit.io'));
  const dokployPage = pages.find((p) => p.url().includes('ali-dokploy.tafidev.online'));

  // 1. ImageKit
  let imagekitKeys = {};
  if (imagekitPage) {
    await imagekitPage.bringToFront();
    // Click the eye icon
    await imagekitPage.evaluate(() => {
      const eyeDiv = document.querySelector('.css-k4h52c');
      if (eyeDiv) eyeDiv.click();
    });

    await new Promise(r => setTimeout(r, 1000));

    imagekitKeys = await imagekitPage.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      return {
        publicKey: inputs[0]?.value,
        privateKey: inputs[1]?.value,
        urlEndpoint: 'https://ik.imagekit.io/plabbpljbd'
      };
    });

    console.log('ImageKit Revealed Keys:', imagekitKeys);
  }

  // 2. Upstash
  let upstashKeys = { url: 'https://together-hippo-184078.upstash.io' };
  if (upstashPage) {
    await upstashPage.bringToFront();
    // In Upstash, let's click on the Token copy button or Read-Only Token
    const token = await upstashPage.evaluate(async () => {
      // Find all buttons in Connect area
      const btns = Array.from(document.querySelectorAll('button'));
      // Find button next to UPSTASH_REDIS_REST_TOKEN
      for (const b of btns) {
        if (b.innerText.includes('TOKEN') || b.parentElement?.innerText?.includes('UPSTASH_REDIS_REST_TOKEN')) {
          b.click();
        }
      }
      
      // Let's check clipboard or copy text
      // Let's find any element containing the token
      const texts = Array.from(document.querySelectorAll('*')).map(e => e.innerText).filter(Boolean);
      for (const t of texts) {
        const m = t.match(/AX[a-zA-Z0-9_-]{20,}/);
        if (m) return m[0];
      }
      return null;
    });

    upstashKeys.token = token;
    console.log('Upstash Keys:', upstashKeys);
  }

  browser.disconnect();
}

main().catch(console.error);
