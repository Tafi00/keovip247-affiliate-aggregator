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

  // --- STEP 1: GENERAL TAB (Git Provider) ---
  console.log('\n>>> STEP 1: CONFIGURING GENERAL TAB VIA GIT SUB-TAB...');
  await dokployPage.goto(`${baseUrl}?tab=general`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Click "Git" sub-tab button
  console.log('Clicking "Git" provider tab...');
  await dokployPage.evaluate(() => {
    const gitTab = document.querySelector('#radix-\\3a r2v\\3a -trigger-git') || Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Git');
    if (gitTab) gitTab.click();
  });

  await new Promise(r => setTimeout(r, 1500));

  // Fill Git Repository URL and Branch
  console.log('Filling Git URL and branch...');
  await dokployPage.evaluate(() => {
    const inputs = Array.from(document.querySelectorAll('input'));
    const urlInput = inputs.find(i => i.placeholder?.includes('github.com') || i.name === 'repository' || i.name === 'customGitUrl') || inputs[0];
    const branchInput = inputs.find(i => i.placeholder === 'main' || i.name === 'branch') || inputs[1];

    if (urlInput) {
      urlInput.value = 'https://github.com/Tafi00/keovip247-affiliate-aggregator.git';
      urlInput.dispatchEvent(new Event('input', { bubbles: true }));
      urlInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    if (branchInput) {
      branchInput.value = 'main';
      branchInput.dispatchEvent(new Event('input', { bubbles: true }));
      branchInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise(r => setTimeout(r, 1000));

  // Select Build Type: Nixpacks
  console.log('Selecting Build Type: nixpacks...');
  await dokployPage.evaluate(() => {
    const nixpacksBtn = document.querySelector('button[value="nixpacks"], input[value="nixpacks"]');
    if (nixpacksBtn) nixpacksBtn.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  // Save General settings
  console.log('Saving General settings...');
  await dokployPage.evaluate(() => {
    const saveBtns = Array.from(document.querySelectorAll('button')).filter(b => b.innerText.trim() === 'Save');
    saveBtns.forEach(b => b.click());
  });

  await new Promise(r => setTimeout(r, 2500));

  // --- STEP 2: ENVIRONMENT TAB ---
  console.log('\n>>> STEP 2: CONFIGURING ENVIRONMENT TAB...');
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
    // Monaco editor setValue
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

  console.log('Saving Environment...');
  await dokployPage.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Save');
    if (saveBtn) saveBtn.click();
  });

  await new Promise(r => setTimeout(r, 2500));

  // --- STEP 3: DOMAINS TAB ---
  console.log('\n>>> STEP 3: CONFIGURING DOMAINS (sslip.io)...');
  await dokployPage.goto(`${baseUrl}?tab=domains`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Click Add Domain if no domain exists yet
  const hasDomain = await dokployPage.evaluate(() => {
    return Array.from(document.querySelectorAll('a, td')).some(el => el.innerText.includes('sslip.io') || el.innerText.includes('tafidev.online'));
  });

  if (!hasDomain) {
    console.log('Adding new domain...');
    await dokployPage.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Add Domain'));
      if (addBtn) addBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // In Add Domain dialog: Click "Generate Domain"
    console.log('Clicking Generate Domain button...');
    await dokployPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const genBtn = btns.find(b => b.innerText.toLowerCase().includes('generate'));
      if (genBtn) genBtn.click();
    });

    await new Promise(r => setTimeout(r, 1500));

    // Save Domain dialog
    console.log('Saving Domain in dialog...');
    await dokployPage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('[role="dialog"] button, button'));
      const createBtn = btns.find(b => b.innerText.trim() === 'Create' || b.innerText.trim() === 'Save');
      if (createBtn) createBtn.click();
    });

    await new Promise(r => setTimeout(r, 2500));
  }

  // Read active domain
  const finalDomains = await dokployPage.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).map(a => a.href).filter(h => h.startsWith('http') && !h.includes('dokploy.tafidev.online/dashboard'));
  });
  console.log('Active Application Domains:', finalDomains);

  // --- STEP 4: TRIGGER DEPLOY ---
  console.log('\n>>> STEP 4: TRIGGERING DEPLOY...');
  await dokployPage.goto(`${baseUrl}?tab=general`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  await dokployPage.evaluate(() => {
    const deployBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Deploy' || b.innerText.trim() === 'Rebuild');
    if (deployBtn) deployBtn.click();
  });

  console.log('Deploy requested! Navigating to Deployments log...');
  await new Promise(r => setTimeout(r, 4000));

  await dokployPage.goto(`${baseUrl}?tab=deployments`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  const deploymentLog = await dokployPage.evaluate(() => {
    return document.body.innerText.slice(0, 1000);
  });
  console.log('Deployment status:', deploymentLog);

  browser.disconnect();
}

main().catch(console.error);
