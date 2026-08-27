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
  const dokployPage = pages.find((p) => p.url().includes('ali-dokploy.tafidev.online'));

  if (dokployPage) {
    await dokployPage.bringToFront();

    // 1. Click General tab
    console.log('--- NAVIGATING TO GENERAL TAB ---');
    await dokployPage.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('button, a, div[role="tab"]'));
      const generalTab = tabs.find(t => t.innerText && t.innerText.trim() === 'General');
      if (generalTab) generalTab.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    const generalInfo = await dokployPage.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select, textarea')).map(i => ({
        label: i.closest('label')?.innerText || i.parentElement?.innerText || '',
        name: i.name,
        type: i.type,
        value: i.value,
        placeholder: i.placeholder
      }));
      const text = document.body.innerText;
      return { inputs, textSnippet: text.slice(0, 1500) };
    });

    console.log('General Info:', JSON.stringify(generalInfo, null, 2));

    // 2. Click Domains tab
    console.log('--- NAVIGATING TO DOMAINS TAB ---');
    await dokployPage.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('button, a, div[role="tab"]'));
      const domTab = tabs.find(t => t.innerText && t.innerText.trim() === 'Domains');
      if (domTab) domTab.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    const domInfo = await dokployPage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button')).map(b => b.innerText.trim());
      const text = document.body.innerText;
      return { buttons, textSnippet: text.slice(0, 1000) };
    });

    console.log('Domains Info:', JSON.stringify(domInfo, null, 2));
  }

  browser.disconnect();
}

main().catch(console.error);
