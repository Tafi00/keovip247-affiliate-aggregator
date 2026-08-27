const fs = require('fs');
const puppeteer = require('puppeteer-core');

async function main() {
  const portFile = `${process.env.HOME}/Library/Application Support/Google/Chrome/DevToolsActivePort`;
  const [port, path] = fs.readFileSync(portFile, 'utf8').trim().split('\n');
  const browserWSEndpoint = `ws://127.0.0.1:${port}${path}`;

  console.log('Connecting puppeteer to:', browserWSEndpoint);
  const browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: null,
  });

  const pages = await browser.pages();
  console.log(`Found ${pages.length} open pages:`);
  for (const p of pages) {
    console.log(`- ${await p.title()} (${p.url()})`);
  }

  // 1. Upstash Page
  let upstashPage = pages.find((p) => p.url().includes('console.upstash.com'));
  let upstashCreds = {};
  if (upstashPage) {
    console.log('\n--- EXTRACTING UPSTASH CREDS ---');
    await upstashPage.bringToFront();
    
    // Look for REST API tab or button
    await upstashPage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button, div, span, a'));
      const restBtn = buttons.find(b => b.innerText && (b.innerText.trim() === '.env' || b.innerText.trim() === 'REST' || b.innerText.includes('UPSTASH_REDIS_REST_URL')));
      if (restBtn) restBtn.click();
    });
    
    await new Promise(r => setTimeout(r, 1000));
    
    const pageText = await upstashPage.evaluate(() => document.body.innerText);
    const urlMatch = pageText.match(/UPSTASH_REDIS_REST_URL="?([^"\n\s]+)"?/);
    const tokenMatch = pageText.match(/UPSTASH_REDIS_REST_TOKEN="?([^"\n\s]+)"?/);
    
    if (urlMatch && tokenMatch) {
      upstashCreds.url = urlMatch[1];
      upstashCreds.token = tokenMatch[1];
    } else {
      console.log('Upstash text snippet:', pageText.slice(0, 1000));
    }
    console.log('Upstash Creds:', upstashCreds);
  }

  // 2. ImageKit Page
  let imagekitPage = pages.find((p) => p.url().includes('imagekit.io'));
  let imagekitCreds = {};
  if (imagekitPage) {
    console.log('\n--- EXTRACTING IMAGEKIT CREDS ---');
    await imagekitPage.bringToFront();
    
    if (!imagekitPage.url().includes('developer-options') && !imagekitPage.url().includes('api-keys')) {
      console.log('Navigating ImageKit to developer options...');
      await imagekitPage.goto('https://imagekit.io/dashboard/developer/api-keys', { waitUntil: 'domcontentloaded' }).catch(() => {});
      await new Promise(r => setTimeout(r, 2000));
    }
    
    const ikData = await imagekitPage.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input')).map(i => ({ name: i.name, id: i.id, value: i.value }));
      const codes = Array.from(document.querySelectorAll('code, span, p, div, input')).map(c => (c.value || c.innerText || '').trim()).filter(Boolean);
      return { 
        inputs, 
        publicKeys: codes.filter(c => c.startsWith('public_')),
        privateKeys: codes.filter(c => c.startsWith('private_')),
        endpoints: codes.filter(c => c.includes('ik.imagekit.io'))
      };
    });
    console.log('ImageKit Data:', ikData);
  }

  // 3. Dokploy Page
  let dokployPage = pages.find((p) => p.url().includes('ali-dokploy.tafidev.online'));
  if (dokployPage) {
    console.log('\n--- DOKPLOY PAGE ---');
    await dokployPage.bringToFront();
    console.log('Dokploy URL:', dokployPage.url());
  }

  browser.disconnect();
}

main().catch(console.error);
