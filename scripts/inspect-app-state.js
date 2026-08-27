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

  // 1. Upstash: Evaluate all window state / localStorage / sessionStorage
  if (upstashPage) {
    await upstashPage.bringToFront();
    const storage = await upstashPage.evaluate(() => {
      const ls = {};
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        ls[k] = localStorage.getItem(k);
      }
      return { ls };
    });
    console.log('Upstash Storage keys:', Object.keys(storage.ls));
  }

  // 2. Dokploy: Let's inspect Dokploy application settings tabs
  if (dokployPage) {
    await dokployPage.bringToFront();
    const dokInfo = await dokployPage.evaluate(() => {
      // Find all tabs in Dokploy
      const tabs = Array.from(document.querySelectorAll('button, a, div[role="tab"]')).map(t => t.innerText.trim()).filter(Boolean);
      // Find current inputs
      const inputs = Array.from(document.querySelectorAll('input, textarea')).map(i => ({
        placeholder: i.placeholder,
        value: i.value,
        name: i.name
      }));
      return { tabs, inputs };
    });
    console.log('Dokploy info:', dokInfo);
  }

  browser.disconnect();
}

main().catch(console.error);
