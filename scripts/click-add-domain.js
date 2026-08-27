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

    // Click Add Domain button specifically
    const addDomainBtn = await dokployPage.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.innerText.trim() === 'Add Domain');
    });

    if (addDomainBtn) {
      await addDomainBtn.click();
      console.log('Clicked Add Domain button');
      await new Promise(r => setTimeout(r, 2000));

      const inputs = await dokployPage.evaluate(() => {
        return Array.from(document.querySelectorAll('input, select, button')).map(el => ({
          tag: el.tagName,
          id: el.id,
          placeholder: el.placeholder,
          name: el.name,
          text: el.innerText
        }));
      });

      console.log('Inputs found after Add Domain click:', inputs);

      // In the drawer/modal, look for "Generate Domain" or host input
      await dokployPage.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const gen = btns.find(b => b.innerText.toLowerCase().includes('generate'));
        if (gen) gen.click();
      });

      await new Promise(r => setTimeout(r, 1500));

      // Click Create
      await dokployPage.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const create = btns.find(b => b.innerText.trim() === 'Create');
        if (create) create.click();
      });

      await new Promise(r => setTimeout(r, 2500));
    }
  }

  browser.disconnect();
}

main().catch(console.error);
