import { getBrowser } from './puppeteer';

jest.setTimeout(10000);

test('check with puppeteer', async () => {
  const browser = await getBrowser();
  const page = await browser.newPage();

  await page.goto('http://www.google.com/ncr');
  await page.type('[name=q]', 'webdriver');
  await page.keyboard.press('Escape');
  await page.click('[name=btnK]');
  await page.waitForNavigation();

  expect(await page.title()).toBe('webdriver - Google Search');
});

// get rid of UnhandledPromiseRejectionWarning
process.on('unhandledRejection', (err) => {
  throw err;
});
