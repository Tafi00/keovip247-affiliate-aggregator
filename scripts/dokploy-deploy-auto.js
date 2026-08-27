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

  // --- STEP 1: GENERAL TAB (Select Repo & Build Type) ---
  console.log('\n>>> STEP 1: CONFIGURING GENERAL TAB...');
  await dokployPage.goto(`${baseUrl}?tab=general`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Click on the Repository dropdown
  console.log('Selecting Repository...');
  await dokployPage.evaluate(async () => {
    // Find the dropdown button for repository
    const buttons = Array.from(document.querySelectorAll('button'));
    const repoBtn = buttons.find(b => b.id && b.id.includes('form-item') && (b.innerText.includes('Select') || b.innerText.includes('keovip') || b.innerText.includes('Tafi00') || b.innerText.includes('Loading')));
    if (repoBtn) repoBtn.click();
  });

  await new Promise(r => setTimeout(r, 1500));

  // Look for our repo in the open menu
  const selectedRepo = await dokployPage.evaluate(() => {
    const items = Array.from(document.querySelectorAll('[role="option"], [role="menuitem"], div, span'));
    const target = items.find(i => i.innerText && i.innerText.includes('keovip247-affiliate-aggregator'));
    if (target) {
      target.click();
      return true;
    }
    return false;
  });
  console.log('Repo selected:', selectedRepo);

  await new Promise(r => setTimeout(r, 1500));

  // Select branch 'main' if needed
  await dokployPage.evaluate(() => {
    const branchInput = document.querySelector('input[name="branch"]');
    if (branchInput) {
      branchInput.value = 'main';
      branchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });

  // Select Build Type: Nixpacks
  console.log('Selecting Build Type: nixpacks...');
  await dokployPage.evaluate(() => {
    const nixpacksRadio = document.querySelector('button[value="nixpacks"], input[value="nixpacks"]');
    if (nixpacksRadio) nixpacksRadio.click();
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
  console.log('\n>>> STEP 2: CONFIGURING ENVIRONMENT VARIABLES...');
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
    // Find Monaco editor or textarea
    const textarea = document.querySelector('textarea, [contenteditable="true"]');
    if (textarea) {
      if (textarea.tagName === 'TEXTAREA') {
        textarea.value = envStr;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        textarea.innerText = envStr;
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
    // Also if Monaco editor is present
    if (window.monaco && window.monaco.editor) {
      const editors = window.monaco.editor.getEditors();
      if (editors.length > 0) {
        editors[0].setValue(envStr);
      }
    }
  }, envContent);

  await new Promise(r => setTimeout(r, 1000));

  // Click Save on Environment
  console.log('Saving Environment variables...');
  await dokployPage.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Save');
    if (saveBtn) saveBtn.click();
  });

  await new Promise(r => setTimeout(r, 2500));

  // --- STEP 3: DOMAINS TAB ---
  console.log('\n>>> STEP 3: CONFIGURING DOMAIN (sslip.io)...');
  await dokployPage.goto(`${baseUrl}?tab=domains`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));

  // Click "Add Domain"
  console.log('Clicking Add Domain button...');
  await dokployPage.evaluate(() => {
    const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Add Domain'));
    if (addBtn) addBtn.click();
  });

  await new Promise(r => setTimeout(r, 1500));

  // In Add Domain dialog, click "Generate Domain" or fill sslip.io domain
  const domainAdded = await dokployPage.evaluate(() => {
    // Look for Generate Domain button
    const buttons = Array.from(document.querySelectorAll('button, a'));
    const genBtn = buttons.find(b => b.innerText.toLowerCase().includes('generate') || b.innerText.toLowerCase().includes('sslip'));
    if (genBtn) {
      genBtn.click();
      return 'generated via button';
    }
    return 'manual';
  });

  console.log('Domain generation mode:', domainAdded);
  await new Promise(r => setTimeout(r, 1500));

  // Click Create in Domain dialog
  await dokployPage.evaluate(() => {
    const dialogButtons = Array.from(document.querySelectorAll('[role="dialog"] button, [data-state="open"] button, button'));
    const createBtn = dialogButtons.find(b => b.innerText.trim() === 'Create' || b.innerText.trim() === 'Save');
    if (createBtn) createBtn.click();
  });

  await new Promise(r => setTimeout(r, 3000));

  // Read current domain list
  const domainsList = await dokployPage.evaluate(() => {
    return Array.from(document.querySelectorAll('a, span, td')).map(e => e.innerText.trim()).filter(t => t.includes('.') && (t.includes('sslip') || t.includes('tafidev') || t.includes('http')));
  });
  console.log('Configured Domains:', domainsList);

  // --- STEP 4: DEPLOY ---
  console.log('\n>>> STEP 4: TRIGGERING DEPLOYMENT...');
  await dokployPage.evaluate(() => {
    const deployBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.trim() === 'Deploy' || b.innerText.trim() === 'Rebuild' || b.innerText.trim() === 'Start');
    if (deployBtn) {
      deployBtn.click();
      return true;
    }
    return false;
  });

  console.log('Deploy button clicked! Waiting for deployment to start...');
  await new Promise(r => setTimeout(r, 5000));

  // Check Deployment logs
  await dokployPage.goto(`${baseUrl}?tab=deployments`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  const deploymentStatus = await dokployPage.evaluate(() => {
    return document.body.innerText.slice(0, 1500);
  });
  console.log('\nDeployments page status:');
  console.log(deploymentStatus);

  browser.disconnect();
}

main().catch(console.error);
