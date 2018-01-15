import puppeteer, { Browser } from 'puppeteer';

let browser: undefined | Browser;

export function getBrowser() {
  if (browser) {
    return browser;
  } else {
    throw `Don't call getBrowser() outside of a test.`;
  }
}

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
});

afterAll(async () => {
  await browser!.close();
  browser = undefined;
});
