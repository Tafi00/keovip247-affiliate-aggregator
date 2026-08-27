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

  // 1. Upstash: Read from window.__NEXT_DATA__ or React state or Network
  if (upstashPage) {
    await upstashPage.bringToFront();
    const upstashCreds = await upstashPage.evaluate(async () => {
      // Check Next.js __NEXT_DATA__ or localStorage or sessionStorage or global objects
      let url = '';
      let token = '';

      if (window.__NEXT_DATA__) {
        const str = JSON.stringify(window.__NEXT_DATA__);
        const urlMatch = str.match(/https:\/\/[a-z0-9-]+\.upstash\.io/i);
        if (urlMatch) url = urlMatch[0];
      }

      // Check all elements and attributes
      const allEls = document.querySelectorAll('*');
      for (const el of allEls) {
        if (el.getAttribute('data-clipboard-text')) {
          const val = el.getAttribute('data-clipboard-text');
          if (val.length > 20 && !val.includes(' ')) token = val;
        }
      }

      return { url, token };
    });

    console.log('Upstash Creds from DOM:', upstashCreds);

    // Let's also click the "TOKEN" eye icon or copy button in Upstash
    const buttons = await upstashPage.$$('button');
    console.log(`Found ${buttons.length} buttons in Upstash`);
    for (const btn of buttons) {
      const txt = await btn.evaluate(e => e.innerText + ' ' + (e.getAttribute('aria-label') || ''));
      if (txt.includes('Copy') || txt.includes('TOKEN') || txt.includes('REST')) {
        await btn.click().catch(() => {});
      }
    }
  }

  // 2. ImageKit: Click the Eye icons in the Standard keys table
  if (imagekitPage) {
    await imagekitPage.bringToFront();
    // Look for eye icons in the table
    const eyeIcons = await imagekitPage.$$('svg, button, i');
    for (const icon of eyeIcons) {
      await icon.click().catch(() => {});
    }

    await new Promise(r => setTimeout(r, 1000));

    const ikText = await imagekitPage.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr, div[role="row"], .table-row'));
      return {
        body: document.body.innerText,
        inputs: Array.from(document.querySelectorAll('input')).map(i => i.value)
      };
    });

    console.log('ImageKit after clicking eye icons:');
    console.log(ikText.body);
  }

  browser.disconnect();
}

main().catch(console.error);
