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
  await new Promise(r => setTimeout(r, 2000));

  // Find all form labels and buttons/inputs in General tab
  const formStructure = await dokployPage.evaluate(() => {
    const fields = Array.from(document.querySelectorAll('.space-y-2, .grid, [role="group"], form')).map(f => f.innerText);
    const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
      text: b.innerText.trim(),
      id: b.id,
      className: b.className
    }));
    return { fields, buttons };
  });

  console.log('Form Structure:', formStructure);

  // Click on the 2nd combobox (which is repository)
  const comboboxes = await dokployPage.$$('[role="combobox"]');
  console.log(`Found ${comboboxes.length} comboboxes`);
  if (comboboxes.length >= 2) {
    console.log('Clicking 2nd combobox (Repo)...');
    await comboboxes[1].click();
    await new Promise(r => setTimeout(r, 1500));

    // Look for options
    const options = await dokployPage.evaluate(() => {
      return Array.from(document.querySelectorAll('[role="option"], [cmdk-item], [data-radix-collection-item]')).map(o => o.innerText.trim());
    });
    console.log('Available repos in combobox:', options);
  }

  browser.disconnect();
}

main().catch(console.error);
