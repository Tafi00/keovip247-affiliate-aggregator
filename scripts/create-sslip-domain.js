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

    // 1. Click "Add Domain"
    console.log('Clicking Add Domain...');
    await dokployPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const addBtn = btns.find(b => b.innerText.includes('Add Domain'));
      if (addBtn) addBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // 2. Click "Generate Domain" or fill inputs
    console.log('Generating / Filling sslip.io domain...');
    const genResult = await dokployPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const genBtn = btns.find(b => b.innerText.toLowerCase().includes('generate'));
      if (genBtn) {
        genBtn.click();
        return 'generated';
      }
      
      // Otherwise fill host manually
      const hostInput = document.querySelector('input[name="host"], input[placeholder*="domain"], input[placeholder*="example"]');
      const portInput = document.querySelector('input[name="port"], input[placeholder*="3000"], input[placeholder*="port"]');
      if (hostInput) {
        hostInput.value = 'keovip-fullstack.164.152.166.65.sslip.io';
        hostInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (portInput) {
        portInput.value = '3000';
        portInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      return 'manual';
    });

    console.log('Domain action:', genResult);
    await new Promise(r => setTimeout(r, 1500));

    // 3. Click Create button in modal
    console.log('Clicking Create Domain button...');
    await dokployPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('[role="dialog"] button, button'));
      const createBtn = btns.find(b => b.innerText.trim() === 'Create' || b.innerText.trim() === 'Save');
      if (createBtn) createBtn.click();
    });

    await new Promise(r => setTimeout(r, 3000));

    // 4. Verify created domain
    const domains = await dokployPage.evaluate(() => {
      return Array.from(document.querySelectorAll('a, td, span')).map(el => el.innerText.trim()).filter(t => t.includes('sslip.io') || t.includes('164.152.166.65'));
    });

    console.log('Created Domains in Dokploy:', domains);
  }

  browser.disconnect();
}

main().catch(console.error);
