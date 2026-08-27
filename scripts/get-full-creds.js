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

  // 1. Upstash Details
  console.log('\n=== UPSTASH DETAILS ===');
  if (upstashPage) {
    await upstashPage.bringToFront();
    // Scroll to Connect section or REST API
    const upstashData = await upstashPage.evaluate(() => {
      // Find all code blocks, inputs, spans
      const text = document.body.innerText;
      return text;
    });

    // Let's click on REST API tab or ".env" in Upstash
    await upstashPage.evaluate(() => {
      const allElements = Array.from(document.querySelectorAll('*'));
      for (const el of allElements) {
        if (el.children.length === 0 && (el.innerText === '.env' || el.innerText === 'REST' || el.innerText === 'Read-Only')) {
          el.click();
        }
      }
    });

    await new Promise(r => setTimeout(r, 1500));

    const connectText = await upstashPage.evaluate(() => {
      return document.body.innerText;
    });

    console.log('--- UPSTASH FULL TEXT ---');
    console.log(connectText);
  }

  // 2. ImageKit Details
  console.log('\n=== IMAGEKIT DETAILS ===');
  if (imagekitPage) {
    await imagekitPage.bringToFront();
    // Click on show private key / copy buttons
    const ikDetails = await imagekitPage.evaluate(async () => {
      // Find table rows
      const rows = Array.from(document.querySelectorAll('tr, .ant-table-row, [role="row"]'));
      // Look for copy icons or eye icons
      const buttons = Array.from(document.querySelectorAll('button, svg, i, span'));
      // Click all eye or copy buttons in standard keys
      buttons.forEach(b => {
        if (b.getAttribute('aria-label') === 'eye' || b.className.toString().includes('eye') || b.className.toString().includes('copy')) {
          b.click();
        }
      });
      return document.body.innerText;
    });
    console.log('--- IMAGEKIT FULL TEXT ---');
    console.log(ikDetails);
  }

  browser.disconnect();
}

main().catch(console.error);
