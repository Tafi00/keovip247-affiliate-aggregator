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

  const baseUrl = 'https://ali-dokploy.tafidev.online/dashboard/project/uAuWwOHLkwMsESPnQUqHj/environment/o0OwfCl8hC2oXbAUUs5GW/services/application/H63lcPgQ5_t_gIkT91vpS';

  await dokployPage.goto(`${baseUrl}?tab=general`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  // Click on the repo button
  console.log('Clicking repo button :r39:-form-item...');
  const repoBtn = await dokployPage.$('#\\:r39\\:-form-item, button[id*="39"]');
  if (repoBtn) {
    await repoBtn.click();
  } else {
    // Click button next to Repository label
    await dokployPage.evaluate(() => {
      const labels = Array.from(document.querySelectorAll('label'));
      const repoLabel = labels.find(l => l.innerText.includes('Repository'));
      if (repoLabel) {
        const btn = repoLabel.parentElement?.querySelector('button');
        if (btn) btn.click();
      }
    });
  }

  await new Promise(r => setTimeout(r, 2000));

  // Find search input in open popover and type keovip
  console.log('Typing keovip into search popover...');
  await dokployPage.keyboard.type('keovip', { delay: 100 });
  await new Promise(r => setTimeout(r, 1500));

  // Read all items in popover
  const popoverItems = await dokployPage.evaluate(() => {
    return Array.from(document.querySelectorAll('[role="option"], [cmdk-item], [data-radix-collection-item], div')).map(e => e.innerText?.trim()).filter(Boolean);
  });
  console.log('Popover items:', popoverItems.slice(0, 30));

  // Click on the keovip item
  const clicked = await dokployPage.evaluate(() => {
    const items = Array.from(document.querySelectorAll('[role="option"], [cmdk-item], [data-radix-collection-item], div, span'));
    const target = items.find(i => i.innerText && i.innerText.includes('keovip247'));
    if (target) {
      target.click();
      return target.innerText;
    }
    return null;
  });
  console.log('Clicked target:', clicked);

  browser.disconnect();
}

main().catch(console.error);
