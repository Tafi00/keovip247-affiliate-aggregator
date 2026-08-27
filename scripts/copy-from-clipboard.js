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

  // 1. ImageKit: Click the Copy button next to Private Key
  let privateKey = '';
  if (imagekitPage) {
    await imagekitPage.bringToFront();
    // In ImageKit table, the second column has a copy icon
    // Let's find all copy icons (the svg with path "M16 1H4...")
    await imagekitPage.evaluate(() => {
      const svgs = Array.from(document.querySelectorAll('svg'));
      const copySvgs = svgs.filter(s => s.querySelector('path')?.getAttribute('d')?.startsWith('M16 1H4'));
      // copySvgs[0] is for public key, copySvgs[1] is for private key
      if (copySvgs[1]) {
        const parent = copySvgs[1].closest('div') || copySvgs[1];
        parent.click();
      }
    });

    await new Promise(r => setTimeout(r, 500));

    // Read clipboard from page
    privateKey = await imagekitPage.evaluate(async () => {
      return await navigator.clipboard.readText().catch(() => '');
    });
    console.log('ImageKit Private Key from clipboard:', privateKey);
  }

  // 2. Upstash: Click the Copy button for REST Token
  let upstashToken = '';
  if (upstashPage) {
    await upstashPage.bringToFront();
    
    // In Upstash, find the copy button near "TOKEN"
    await upstashPage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const tokenBtn = buttons.find(b => b.innerText.trim() === 'TOKEN' || b.parentElement?.innerText?.includes('TOKEN'));
      if (tokenBtn) tokenBtn.click();
    });

    await new Promise(r => setTimeout(r, 500));

    upstashToken = await upstashPage.evaluate(async () => {
      return await navigator.clipboard.readText().catch(() => '');
    });
    console.log('Upstash Token from clipboard:', upstashToken);
  }

  browser.disconnect();
}

main().catch(console.error);
