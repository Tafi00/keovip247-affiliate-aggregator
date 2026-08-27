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

  // 1. Upstash DOM inspection
  if (upstashPage) {
    await upstashPage.bringToFront();
    const upstashHtml = await upstashPage.evaluate(() => {
      // Find the container with .env or Connect
      const headers = Array.from(document.querySelectorAll('h2, h3, h4, div'));
      const connectHeader = headers.find(h => h.innerText === 'Connect' || h.innerText === 'Connect to your Redis database from anywhere');
      return connectHeader ? connectHeader.parentElement?.parentElement?.innerHTML : document.body.innerHTML;
    });
    fs.writeFileSync('/Users/nttafi/Documents/antigravity/mysterious-rutherford/scripts/upstash.html', upstashHtml || '');
    console.log('Saved upstash.html (length:', upstashHtml?.length, ')');
  }

  // 2. ImageKit DOM inspection
  if (imagekitPage) {
    await imagekitPage.goto('https://imagekit.io/dashboard/developer/api-keys', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 2000));
    const ikHtml = await imagekitPage.evaluate(() => document.body.innerHTML);
    fs.writeFileSync('/Users/nttafi/Documents/antigravity/mysterious-rutherford/scripts/imagekit.html', ikHtml || '');
    console.log('Saved imagekit.html (length:', ikHtml?.length, ')');
  }

  // 3. Dokploy DOM inspection
  if (dokployPage) {
    await dokployPage.bringToFront();
    const dokHtml = await dokployPage.evaluate(() => document.body.innerHTML);
    fs.writeFileSync('/Users/nttafi/Documents/antigravity/mysterious-rutherford/scripts/dokploy.html', dokHtml || '');
    console.log('Saved dokploy.html (length:', dokHtml?.length, ')');
  }

  browser.disconnect();
}

main().catch(console.error);
