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

  // --- STEP 1: SAVE GENERAL TAB WITH NIXPACKS ---
  console.log('\n>>> 1. SAVING GENERAL TAB (Nixpacks & Main Branch)...');
  await dokployPage.goto(`${baseUrl}?tab=general`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Select Nixpacks
  await dokployPage.evaluate(() => {
    const nixBtn = document.querySelector('button[value="nixpacks"], input[value="nixpacks"]');
    if (nixBtn) nixBtn.click();
    // Click all save buttons in General
    const saveBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.trim() === 'Save');
    saveBtns.forEach(b => b.click());
  });
  await new Promise(r => setTimeout(r, 2500));

  // --- STEP 2: SAVE ENVIRONMENT VARIABLES ---
  console.log('\n>>> 2. SAVING ENVIRONMENT TAB...');
  await dokployPage.goto(`${baseUrl}?tab=environment`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  const envContent = `ADMIN_PASSWORD=admin123456
ADMIN_SECRET=keovip-super-secret-key-2026-production
UPSTASH_REDIS_REST_URL=https://together-hippo-184078.upstash.io
IMAGEKIT_PUBLIC_KEY=public_MoQKApQPdnHL/8Pj54XDFR2Wvn8=
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/plabbpljbd
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/plabbpljbd
PORT=3000
NODE_ENV=production`;

  await dokployPage.evaluate((envStr) => {
    if (window.monaco && window.monaco.editor) {
      const editors = window.monaco.editor.getEditors();
      if (editors && editors.length > 0) {
        editors[0].setValue(envStr);
      }
    }
    const ta = document.querySelector('textarea');
    if (ta) {
      ta.value = envStr;
      ta.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }, envContent);

  await new Promise(r => setTimeout(r, 1000));

  // Click Save
  await dokployPage.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Save');
    if (saveBtn) saveBtn.click();
  });
  await new Promise(r => setTimeout(r, 2500));

  // --- STEP 3: CONFIGURE DOMAIN ---
  console.log('\n>>> 3. CONFIGURING DOMAIN (sslip.io)...');
  await dokployPage.goto(`${baseUrl}?tab=domains`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Check existing domains
  const existingDomain = await dokployPage.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a')).map(a => a.innerText.trim());
    return links.find(l => l.includes('.'));
  });

  if (!existingDomain) {
    console.log('No domain configured yet. Clicking Add Domain...');
    await dokployPage.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Add Domain'));
      if (addBtn) addBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // Look for Generate Domain button in the open modal
    console.log('Generating sslip domain...');
    await dokployPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const genBtn = btns.find(b => b.innerText.toLowerCase().includes('generate'));
      if (genBtn) genBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // Click Create / Save button in modal
    console.log('Creating domain...');
    await dokployPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('[role="dialog"] button, button'));
      const createBtn = btns.find(b => b.innerText.trim() === 'Create' || b.innerText.trim() === 'Save');
      if (createBtn) createBtn.click();
    });

    await new Promise(r => setTimeout(r, 3000));
  } else {
    console.log('Existing domain found:', existingDomain);
  }

  const activeDomains = await dokployPage.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.innerText.trim()).filter(t => t.includes('.'));
  });
  console.log('Current Domains:', activeDomains);

  // --- STEP 4: TRIGGER DEPLOY ---
  console.log('\n>>> 4. TRIGGERING DEPLOYMENT NOW...');
  await dokployPage.goto(`${baseUrl}?tab=general`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  await dokployPage.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const deployBtn = btns.find(b => b.innerText.trim() === 'Deploy' || b.innerText.trim() === 'Rebuild');
    if (deployBtn) deployBtn.click();
  });

  console.log('Deployment triggered! Waiting 5s then checking Deployments tab...');
  await new Promise(r => setTimeout(r, 5000));

  await dokployPage.goto(`${baseUrl}?tab=deployments`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  const deploymentText = await dokployPage.evaluate(() => document.body.innerText.slice(0, 1500));
  console.log('Deployments Status:\n', deploymentText);

  browser.disconnect();
}

main().catch(console.error);
