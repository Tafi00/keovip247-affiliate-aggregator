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

  // 1. ImageKit
  let ikCreds = {};
  if (imagekitPage) {
    await imagekitPage.bringToFront();
    // Click the eye icon
    const eyeBtn = await imagekitPage.$('.css-k4h52c');
    if (eyeBtn) {
      console.log('Clicking ImageKit eye button...');
      await eyeBtn.click();
      await new Promise(r => setTimeout(r, 2000));
    }

    ikCreds = await imagekitPage.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input')).map(i => i.value);
      return {
        publicKey: inputs[0],
        privateKey: inputs[1],
        urlEndpoint: 'https://ik.imagekit.io/plabbpljbd',
      };
    });
    console.log('ImageKit Creds:', ikCreds);
  }

  // 2. Upstash
  let upstashCreds = {};
  if (upstashPage) {
    await upstashPage.bringToFront();
    // In Upstash, let's click on the button that has "TOKEN"
    await upstashPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const tokenBtn = btns.find(b => b.innerText && b.innerText.trim() === 'TOKEN');
      if (tokenBtn) tokenBtn.click();
    });

    await new Promise(r => setTimeout(r, 1000));

    // Also look at the redis-cli line or copy buttons
    const upstashText = await upstashPage.evaluate(() => document.body.innerText);
    const cliMatch = upstashText.match(/redis:\/\/default:([A-Za-z0-9_-]+)@together-hippo-184078\.upstash\.io/);
    
    // Read clipboard
    const clip = await upstashPage.evaluate(async () => {
      return await navigator.clipboard.readText().catch(() => '');
    });

    upstashCreds = {
      url: 'https://together-hippo-184078.upstash.io',
      tokenFromCli: cliMatch ? cliMatch[1] : null,
      tokenFromClip: clip && clip.length > 20 ? clip : null,
    };
    console.log('Upstash Creds:', upstashCreds);
  }

  browser.disconnect();
}

main().catch(console.error);
