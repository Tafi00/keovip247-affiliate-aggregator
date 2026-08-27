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

  let upstashToken = '';
  if (upstashPage) {
    await upstashPage.bringToFront();
    // In Upstash, look for the copy button next to UPSTASH_REDIS_REST_TOKEN or Token
    upstashToken = await upstashPage.evaluate(async () => {
      // Find buttons near "TOKEN" or "Read-Only Token"
      const buttons = Array.from(document.querySelectorAll('button, svg'));
      // Let's find button with copy icon or aria-label="Copy"
      const copyBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.includes('Copy') || b.querySelector('svg'));
      
      // Let's inspect React props / fibers if available or click copy
      // Or find the token in the code snippet pre element
      const pre = document.querySelector('pre');
      // Click the copy button of the .env code block
      const allButtons = Array.from(document.querySelectorAll('button'));
      for (const btn of allButtons) {
        if (btn.innerText.toLowerCase().includes('copy') || btn.getAttribute('aria-label')?.includes('copy')) {
          btn.click();
        }
      }

      // Also search React fiber for token
      function findTokenInFiber(node) {
        if (!node) return null;
        for (const key in node) {
          if (key.startsWith('__reactFiber') || key.startsWith('__reactInternalInstance')) {
            const fiber = node[key];
            let curr = fiber;
            while (curr) {
              if (curr.memoizedProps) {
                const s = JSON.stringify(curr.memoizedProps);
                if (s && s.includes('together-hippo-184078.upstash.io')) {
                  const match = s.match(/"(A[A-Za-z0-9_-]{20,})"/);
                  if (match) return match[1];
                }
              }
              curr = curr.return;
            }
          }
        }
        return null;
      }

      const found = findTokenInFiber(document.body);
      return found;
    });

    console.log('Upstash Token via React fiber:', upstashToken);
  }

  let ikPublic = '';
  let ikPrivate = '';
  if (imagekitPage) {
    await imagekitPage.bringToFront();
    const ikKeys = await imagekitPage.evaluate(async () => {
      // In ImageKit table, find table td elements
      const tds = Array.from(document.querySelectorAll('td'));
      const textArray = tds.map(t => t.innerText.trim());

      // Search React fiber for keys
      function findKeysInFiber(node) {
        if (!node) return {};
        const res = {};
        const elements = Array.from(node.querySelectorAll('*'));
        for (const el of elements) {
          for (const key in el) {
            if (key.startsWith('__reactFiber') || key.startsWith('__reactInternalInstance')) {
              let curr = el[key];
              while (curr) {
                if (curr.memoizedProps) {
                  const s = JSON.stringify(curr.memoizedProps);
                  if (s && s.includes('public_')) {
                    const pubMatch = s.match(/(public_[A-Za-z0-9=+/_-]+)/);
                    if (pubMatch) res.public = pubMatch[1];
                  }
                  if (s && s.includes('private_')) {
                    const privMatch = s.match(/(private_[A-Za-z0-9=+/_-]+)/);
                    if (privMatch) res.private = privMatch[1];
                  }
                }
                curr = curr.return;
              }
            }
          }
        }
        return res;
      }

      const fiberKeys = findKeysInFiber(document.body);
      return { textArray, fiberKeys };
    });

    console.log('ImageKit Keys:', ikKeys);
  }

  browser.disconnect();
}

main().catch(console.error);
