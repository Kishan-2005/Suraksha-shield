const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE EXCEPTION:', error.message, error.stack);
  });

  await page.goto('http://localhost:5173/');
  
  // Set up a user in local storage to ensure login works
  await page.evaluate(() => {
    localStorage.setItem('honeyShieldUsers', JSON.stringify([{email: 'admin@admin.com', password: 'admin'}]));
  });
  await page.reload();

  await page.waitForSelector('input[type="email"]');
  await page.type('input[type="email"]', 'admin@admin.com');
  await page.type('input[type="password"]', 'admin');
  await page.evaluate(() => document.querySelector('button[type="submit"]').click());

  await page.waitForSelector('aside nav button', { timeout: 5000 });
  
  const clickTab = async (name) => {
    console.log(`\n--- Clicking ${name} ---`);
    const tabs = await page.$$('aside nav button');
    for (let tab of tabs) {
      const text = await page.evaluate(el => el.textContent, tab);
      if (text && text.includes(name)) {
        await page.evaluate(el => el.click(), tab);
        await new Promise(r => setTimeout(r, 1000));
        break;
      }
    }
  };

  await clickTab('Identity Risk');
  await clickTab('EDI Engine');
  
  await browser.close();
})();
