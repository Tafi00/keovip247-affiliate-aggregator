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
  let dokployPage = pages.find((p) => p.url().includes('ali-dokploy.tafidev.online'));

  if (dokployPage) {
    await dokployPage.bringToFront();
    const currentUrl = dokployPage.url();
    console.log('Current Dokploy URL:', currentUrl);

    // Read all text on current page
    const text = await dokployPage.evaluate(() => document.body.innerText);
    console.log('Page Snippet:', text.slice(0, 800));
  }

  browser.disconnect();
}

main().catch(console.error);
