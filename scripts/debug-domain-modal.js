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

    // Click Add Domain button
    await dokployPage.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Add Domain'));
      if (addBtn) addBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // Inspect the modal dialog
    const dialogInfo = await dokployPage.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"], [data-state="open"]');
      if (!dialog) return { error: 'No dialog found' };
      const inputs = Array.from(dialog.querySelectorAll('input, select, button')).map(i => ({
        tag: i.tagName,
        type: i.type,
        name: i.name,
        id: i.id,
        placeholder: i.placeholder,
        value: i.value,
        text: i.innerText
      }));
      return { dialogText: dialog.innerText, inputs };
    });

    console.log('Dialog Info:', JSON.stringify(dialogInfo, null, 2));

    // Fill Host: fullstack-keovip.164.152.166.65.sslip.io
    // Fill Path: /
    // Fill Port: 3000
    // Click Generate or Create
    await dokployPage.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"], [data-state="open"]');
      if (!dialog) return;

      const hostInput = dialog.querySelector('input[name="host"]') || dialog.querySelectorAll('input')[0];
      const portInput = dialog.querySelector('input[name="port"]') || dialog.querySelectorAll('input')[2];

      if (hostInput) {
        // Trigger React input change
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(hostInput, 'keovip.164.152.166.65.sslip.io');
        hostInput.dispatchEvent(new Event('input', { bubbles: true }));
        hostInput.dispatchEvent(new Event('change', { bubbles: true }));
      }

      if (portInput) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(portInput, '3000');
        portInput.dispatchEvent(new Event('input', { bubbles: true }));
        portInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });

    await new Promise(r => setTimeout(r, 1000));

    // Click Create button inside dialog
    await dokployPage.evaluate(() => {
      const dialog = document.querySelector('[role="dialog"], [data-state="open"]');
      if (!dialog) return;
      const createBtn = Array.from(dialog.querySelectorAll('button')).find(b => b.innerText.trim() === 'Create');
      if (createBtn) createBtn.click();
    });

    await new Promise(r => setTimeout(r, 3000));

    const domainList = await dokployPage.evaluate(() => {
      return Array.from(document.querySelectorAll('a, td, div')).map(el => el.innerText.trim()).filter(t => t.includes('sslip.io'));
    });
    console.log('Domains on page after create:', domainList);
  }

  browser.disconnect();
}

main().catch(console.error);
