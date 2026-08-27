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
  if (!dokployPage) {
    dokployPage = await browser.newPage();
  }

  const baseUrl = 'https://ali-dokploy.tafidev.online/dashboard/project/uAuWwOHLkwMsESPnQUqHj/environment/o0OwfCl8hC2oXbAUUs5GW/services/application/H63lcPgQ5_t_gIkT91vpS';

  // 1. GENERAL TAB
  console.log('\n=== 1. GENERAL TAB ===');
  await dokployPage.goto(`${baseUrl}?tab=general`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  const generalDetails = await dokployPage.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input, select, textarea, button')).map(el => ({
      tag: el.tagName,
      type: el.type,
      name: el.name,
      id: el.id,
      text: el.innerText,
      placeholder: el.placeholder,
      value: el.value,
      ariaLabel: el.getAttribute('aria-label')
    }));
    return {
      title: document.title,
      text: document.body.innerText.slice(0, 2000),
      inputs
    };
  });
  console.log(JSON.stringify(generalDetails, null, 2));

  // 2. DOMAINS TAB
  console.log('\n=== 2. DOMAINS TAB ===');
  await dokployPage.goto(`${baseUrl}?tab=domains`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  const domainsDetails = await dokployPage.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim()).filter(Boolean);
    return {
      text: document.body.innerText.slice(0, 1500),
      buttons
    };
  });
  console.log(JSON.stringify(domainsDetails, null, 2));

  browser.disconnect();
}

main().catch(console.error);
